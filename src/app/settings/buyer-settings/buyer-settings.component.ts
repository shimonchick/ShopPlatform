import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MapsLocation} from '../../models/location';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Buyer} from '../../models/buyer';
import {GeocodeService} from '../../services/geocode.service';
// import {google} from '@agm/core/services/google-maps-types';
declare let google: any;

@Component({
    selector: 'app-buyer-settings',
    templateUrl: './buyer-settings.component.html',
    styleUrls: ['./buyer-settings.component.scss']
})
export class BuyerSettingsComponent implements OnInit {
    addressForm = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: [null],
    });

    loading: boolean;
    location: MapsLocation;
    selectedMarker: MapsLocation;

    address: string;

    constructor(
        private fb: FormBuilder,
        private page: Location,
        private auth: AuthService,
        private db: AngularFirestore,
        private geocodeService: GeocodeService,
        private ref: ChangeDetectorRef,
    ) {
    }

    async ngOnInit() {
        const buyer: Buyer = await this.auth.getUserAsPromise() as Buyer;
        console.log(buyer);
        console.log(buyer.coordinates);
        this.location = buyer.coordinates === undefined ? {lat: 42.6977, lng: 23.3219} : buyer.coordinates;
        this.selectedMarker = this.location;
    }

    async registerBuyer(firstName: string, lastName: string, phoneNumber: string) {
        // if (!this.addressForm.valid) { return; }
        const user = await this.auth.getUserAsPromise();
        const buyer: Buyer = {
            ...user,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            coordinates: {
                lat: this.location.lat,
                lng: this.location.lng
            },
            address: this.address,
            roles: {
                buyer: true
            }
        };
        this.db.doc(`users/${user.uid}`).set(buyer, {merge: true});

        alert('You are now registered as a buyer');
        setTimeout(() => this.page.back(), 1000);

    }

    selectMarker(lat: number, lng: number) {
        this.selectedMarker.lat = lat;
        this.selectedMarker.lng = lng;
        console.log('marker location changed');
        this.getAddress(lat, lng);
    }

    addressToCoordinates() {
        this.loading = true;
        this.geocodeService.geocodeAddress(this.address)
            .subscribe((location: MapsLocation) => {
                    this.selectedMarker = location;
                    this.loading = false;
                    this.ref.detectChanges();
                }
            );
    }

    getAddress(lat: number, lng: number) {
        console.log('Finding Address');
        if (navigator.geolocation) {
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(lat, lng);
            const request = {latLng: latlng};
            geocoder.geocode(request, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const result = results[0];
                    const rsltAdrComponent = result.address_components;
                    const resultLength = rsltAdrComponent.length;
                    console.log(rsltAdrComponent);
                    if (result != null) {
                        this.address = rsltAdrComponent[3].short_name + ' ' + rsltAdrComponent[2].short_name
                            + ' ' + rsltAdrComponent[1].short_name
                            + ' ' + rsltAdrComponent[0].short_name;
                        console.log(this.address);
                    } else {
                        alert('No address available!');
                    }
                }
            });
        }
    }

    mapReady() {
        this.getAddress(this.location.lat, this.location.lng);
    }
}


import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {MapsLocation} from '../models/location';
import {AuthService} from '../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Seller} from '../models/seller';
// import {google} from '@agm/core/services/google-maps-types';
declare let google: any;

@Component({
    selector: 'app-buyer-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    addressForm = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
    });

    loading: boolean;
    location: MapsLocation;
    selectedMarker: MapsLocation;

    address: string;

    constructor(
        private fb: FormBuilder,
        private page: Location,
        public auth: AuthService,
        private db: AngularFirestore,
    ) {
    }

    ngOnInit() {
        this.auth.user$.subscribe((seller: Seller) => {
            this.location = seller.coordinates;
            if (this.location === undefined) {
                if (navigator.geolocation) {
                    new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition((data) => {
                            resolve({lat: data.coords.latitude, lng: data.coords.longitude});
                        }, err => resolve({lat: -74.006, lng: 40.71}));
                    }).then((location: MapsLocation) => {
                        this.location = location;
                        this.selectedMarker = location;
                    });
                }
            } else {
                this.selectedMarker = this.location;

            }
            if (seller.firstName) {
                this.addressForm.get('firstName').setValue(seller.firstName);
            }
            if (seller.lastName) {
                this.addressForm.get('lastName').setValue(seller.lastName);
            }
            if (seller.phoneNumber) {
                this.addressForm.get('phoneNumber').setValue(seller.phoneNumber);
            }
        });
    }

    async registerSeller(firstName: string, lastName: string, phoneNumber: string) {
        // if (!this.addressForm.valid) { return; }
        const user = await this.auth.getUser();
        const seller: Seller = {
            ...user,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            coordinates: this.location,
            address: this.address,
            roles: {
                seller: true
            }
        };
        this.db.doc(`users/${user.uid}`).set(seller, {merge: true});

        alert('You are now registered as a buyer');
        setTimeout(() => this.page.back(), 1000);

    }

    selectMarker(lat: number, lng: number) {
        this.selectedMarker.lat = lat;
        this.selectedMarker.lng = lng;
        console.log('marker location changed');
        this.getAddress(lat, lng);
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

    showLocation() {
        this.getAddress(this.location.lat, this.location.lng);
    }
}


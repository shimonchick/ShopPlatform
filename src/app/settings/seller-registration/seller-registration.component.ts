import {AuthService} from '../../services/auth.service';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Seller} from '../../models/seller';
import {Location} from '@angular/common';

@Component({
    selector: 'app-seller-registration',
    templateUrl: './seller-registration.component.html',
    styleUrls: ['./seller-registration.component.scss']
})
export class SellerRegistrationComponent {
    addressForm = this.fb.group({
        company: null,
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: [null, Validators.required],
        delivery: ['standard', Validators.required]
    });

    latitude = 42.6977;
    longitude = 23.3219;
    selectedMarker = {
        latitude: this.latitude,
        longitude: this.longitude
    };

    constructor(
        private fb: FormBuilder,
        private location: Location,
        private auth: AuthService,
        private db: AngularFirestore,
    ) {
    }

    async registerSeller(company: string | null, firstName: string, lastName: string, phoneNumber: string,
                         address: string) {
        // if (!this.addressForm.valid) { return; }
        const user = this.auth.getSnapshotUser();
        const seller: Seller = {
            ...user,
            company: company,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
            coordinates: {
                lat: this.selectedMarker.latitude,
                lng: this.selectedMarker.longitude,
            },
            roles: {
                seller: true
            }
        };
        this.db.doc(`users/${user.uid}`).set(seller, {merge: true});

        alert('You are now registered as a seller');
        setTimeout(() => this.location.back(), 1000);

    }

    selectMarker(lat: number, lng: number) {
        this.selectedMarker.latitude = lat;
        this.selectedMarker.longitude = lng;
    }

}

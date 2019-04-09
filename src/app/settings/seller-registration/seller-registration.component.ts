import {AuthService} from '../../services/auth.service';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';


import {Router} from '@angular/router';

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
        city: [null, Validators.required],
        postalCode: [null, Validators.compose([
            Validators.required, Validators.minLength(3), Validators.maxLength(5)])
        ],
        delivery: ['standard', Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private auth: AuthService
    ) {
    }

    async registerSeller(company: string | null, firstName: string, lastName: string, phoneNumber: string, city: string,
                         address: string, postCode: string) {
        // if (!this.addressForm.valid) { return; }
        const user = this.auth.getSnapshotUser();
        user.company = company;
        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNumber = phoneNumber;
        user.city = city;
        user.address = address;
        user.postalCode = postCode;

        user.roles.seller = true;
        console.log(user);
        await this.auth.updateUserData(user);
        alert('You are now registered as a seller');
        this.router.navigateByUrl('chats');
    }

}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

declare var StripeCheckout; // : StripeCheckoutStatic;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    value = 1;
    uploading = false;
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private dialogRef: MatDialogRef<CheckoutComponent>,
                private router: Router,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        console.log(this.data.productId);
    }

    onPaymentAttempt(paid: boolean) {
        if (paid) {
            const snackBarRef = this.snackBar.open('Product priority set', 'Dismiss', {
                duration: 3000,
            });

            this.dialogRef.close();
            this.router.navigate(['products'], this.data.productId);
        }
    }

    onUploading(uploading: boolean) {
        this.uploading = uploading;
    }
}

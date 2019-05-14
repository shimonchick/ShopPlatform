import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {AuthService} from '../../../services/auth.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

declare var StripeCheckout; // : StripeCheckoutStatic;

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    @Input() amount;
    @Input() description;
    @Input() color;
    @Output() paid = new EventEmitter<any>();
    handler; // : StripeCheckoutHandler;
    error = null;
    // confirmation: any;
    loading = false;

    constructor(private auth: AuthService, private functions: AngularFireFunctions) {
    }

    ngOnInit() {
        this.handler = StripeCheckout.configure({
            key: 'pk_test_EmC4mZ1ZgzenHqSHS0zLkKyY00p0Q6mX7d',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            opened: function () {
                console.log('checkout form opened');
            },
            closed: function () {
                console.log('checkout form closed');
            },
            source: async (source) => {
                this.loading = true;
                const user = await this.auth.getUser();
                const stripeAttachSource = this.functions.httpsCallable('stripeAttachSource');
                const stripeCreateCharge = this.functions.httpsCallable('stripeCreateCharge');
                await stripeAttachSource({uid: user.uid, source: source.id}).toPromise();
                const confirmation = await stripeCreateCharge({source: source.id, uid: user.uid, amount: this.amount})
                    .pipe(catchError(this.handleError))
                    .toPromise();
                this.loading = false;
                console.log(confirmation);
                this.paid.emit(confirmation);
            }
        });
    }

    @HostListener('click')
    // Open the checkout handler
    async checkout(e) {
        const user = await this.auth.getUser();
        this.handler.open({
            name: 'ShopPlatform',
            description: this.description,
            amount: this.amount,
            email: user.email,
        });
        e.preventDefault();
    }

    // Close on navigate
    @HostListener('window:popstate')
    onPopstate() {
        console.log('popup closed because of navigate');
        this.handler.close();
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        this.error = errorMessage;
        // window.alert(errorMessage);
        return of(null);
        // return throwError(errorMessage); // if you want to rethrow the error
    }
}

import {Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthService} from '../../services/auth.service';

declare var StripeCheckout; // : StripeCheckoutStatic;

@Directive({
    selector: '[appCheckout]'
})
export class CheckoutDirective implements OnInit {


    @Input() amount;
    @Input() description;
    @Output() paid = new EventEmitter<any>();
    handler; // : StripeCheckoutHandler;

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
                const user = await this.auth.getUser();
                const fun = this.functions.httpsCallable('stripeCreateCharge');
                const confirmation = await fun({source: source.id, uid: user.uid, amount: this.amount})
                    .pipe(retry(1), catchError(this.handleError))
                    .toPromise();
                console.log(confirmation);
                this.paid.emit(confirmation);

            }
        });
    }

    @HostListener('click')
    // Open the checkout handler
    async checkout() {
        const user = await this.auth.getUser();
        this.handler.open({
            name: 'ShopPlatform',
            description: this.description,
            amount: this.amount,
            email: user.email,
        });
        // e.preventDefault();
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
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}

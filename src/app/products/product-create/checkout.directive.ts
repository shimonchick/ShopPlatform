import {Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AngularFireFunctions} from '@angular/fire/functions';

declare var StripeCheckout; // : StripeCheckoutStatic;

@Directive({
    selector: '[appCheckout]'
})
export class CheckoutDirective implements OnInit {


    @Input() amount;
    @Input() description;
    @Output() paid = new EventEmitter<boolean>();
    handler; // : StripeCheckoutHandler;

    constructor(private auth: AuthService, private functions: AngularFireFunctions) {
    }

    ngOnInit() {
        this.handler = StripeCheckout.configure({
            key: 'pk_test_EmC4mZ1ZgzenHqSHS0zLkKyY00p0Q6mX7d',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            // image: '/your-avatar.png', //  TODO: link to asset image
            locale: 'auto',
            opened: function () {
                console.log('checkout form opened');
            },
            closed: function () {
                // this.paid.emit(false);
                console.log('checkout form closed');
            },
            source: async (source) => {
                // this.loading = true;
                const user = await this.auth.getUserAsPromise();
                const fun = this.functions.httpsCallable('stripeCreateCharge');
                const confirmation = await fun({source: source.id, uid: user.uid, amount: this.amount}).toPromise();
                console.log(confirmation);
                this.paid.emit(confirmation.paid);

                // this.loading = false;

            }
        });
    }

    @HostListener('click')
    // Open the checkout handler
    async checkout() {
        const user = await this.auth.getUserAsPromise();
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

}

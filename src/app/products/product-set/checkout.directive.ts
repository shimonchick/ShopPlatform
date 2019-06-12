import {Directive, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthService} from '../../services/auth.service';

declare var StripeCheckout; // : StripeCheckoutStatic;

@Directive({
    selector: '[appCheckout]'
})
export class CheckoutDirective implements OnInit {


    @Input() amount;
    @Input() description;
    @Input() productId;
    handler; // : StripeCheckoutHandler;


    @Output()
    private paid = new EventEmitter<boolean>();

    @Output()
    private uploading = new EventEmitter<boolean>();

    constructor(private auth: AuthService,
                private functions: AngularFireFunctions) {
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
                this.uploading.emit(true);
                const user = await this.auth.getUser();
                const stripeAttachSource = this.functions.httpsCallable('stripeAttachSource');
                const stripeCreateCharge = this.functions.httpsCallable('stripeCreateCharge');
                await stripeAttachSource({uid: user.uid, source: source.id}).toPromise();
                console.log(this.productId);
                const confirmation = await stripeCreateCharge({
                    source: source.id, uid: user.uid,
                    amount: this.amount, productId: this.productId
                })
                    .pipe(catchError(this.handleError))
                    .toPromise();
                if (confirmation) {
                    this.uploading.emit(false);
                    this.paid.emit(true);
                } else {
                    this.paid.emit(false);
                }
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

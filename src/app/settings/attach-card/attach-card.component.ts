import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AngularFireFunctions} from '@angular/fire/functions';

declare var Stripe;

@Component({
    selector: 'app-attach-card',
    templateUrl: './attach-card.component.html',
    styleUrls: ['./attach-card.component.scss']
})
export class AttachCardComponent implements AfterViewInit {

    @ViewChild('cardElement')
    cardElement: ElementRef;

    stripe;
    card;
    elements;
    cardErrors;

    constructor(
        private auth: AuthService,
        private functions: AngularFireFunctions,
    ) {
    }

    ngAfterViewInit() {
        this.stripe = Stripe('pk_test_EmC4mZ1ZgzenHqSHS0zLkKyY00p0Q6mX7d');
        this.elements = this.stripe.elements();
        const style = {
            base: {
                // Add your base input styles here. For example:
                fontSize: '16px',
                color: '#32325d',
            },
        };
        this.card = this.elements.create('card', {style: style});
        this.card.mount(this.cardElement.nativeElement);

        this.card.addEventListener('change', ({error}) => {
            this.cardErrors = error && error.message;
        });

    }

    async sourceHandler(source) {
        console.log(source.id);

        const attachFun = this.functions.httpsCallable('stripeAttachSource');

        const res = await attachFun({source: source.id});

        console.log(res);
        alert('Success! source attached to customer');

    }

    async handleForm(event) {
        event.preventDefault();

        const {source, error} = await this.stripe.createSource(this.card); // Changed fron Token to Source
        console.log(source);
        if (error) {
            // Inform the customer that there was an error.
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
        } else {
            // Send the token to your server.
            this.sourceHandler(source);
        }
    }

}

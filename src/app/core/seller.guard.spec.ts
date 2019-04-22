import {inject, TestBed} from '@angular/core/testing';

import {SellerGuard} from './seller.guard';

describe('SellerGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SellerGuard]
        });
    });

    it('should ...', inject([SellerGuard], (guard: SellerGuard) => {
        expect(guard).toBeTruthy();
    }));
});

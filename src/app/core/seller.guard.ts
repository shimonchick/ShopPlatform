import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SellerGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.auth.canCreateProducts()) {
            this.router.navigateByUrl('register/seller');
            return false;
        }
        return true;
    }

}

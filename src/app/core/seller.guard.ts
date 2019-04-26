import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SellerGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.user$.pipe(
            map(user => user.roles.seller),
            tap((canActivate) => {
                if (!canActivate) {
                    this.router.navigate(['settings']);
                    return false;
                }
                return true;
            })
        );
    }
}

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SystemConstants } from './../common/system.constants';
import { UrlConstants } from './../common/url.constants';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private _router: Router
	) { }

	canActivate(
		activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot
	) {
		if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
			return true;
		} else {
			this._router.navigate([UrlConstants.LOGIN], {
				queryParams: {
					returnUrl: routerStateSnapshot.url
				}
			});
			return false;
		}
	}

}
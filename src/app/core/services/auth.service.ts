import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../../core/common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {

	constructor(private _http: Http) { }

	login(username: string, password: string) {
		let body = "userName=" + encodeURIComponent(username) +
			"&password=" + encodeURIComponent(password) +
			"&grant_type=password";
		let headers = new Headers();
		headers.append("Content-Type", "application/x-www-form-urlencoded");
		let options = new RequestOptions({ headers: headers });

		return this._http.post(SystemConstants.BASE_API + '/api/oauth/token', body, options).map((response: Response) => {
			let user: LoggedInUser = response.json();
			if (user && user.access_token) {
				localStorage.removeItem(SystemConstants.CURRENT_USER);
				localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
			}
		});
	}
	logout() {
		localStorage.removeItem(SystemConstants.CURRENT_USER);
	}

	isUserAuthenticated(): boolean {
		let user = localStorage.getItem(SystemConstants.CURRENT_USER);
		if (user != null) {
			return true;
		}
		else
			return false;
	}

	getLoggedInUser(): LoggedInUser {
		let user: LoggedInUser;
		if (this.isUserAuthenticated()) {
			var userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
			user = new LoggedInUser(
				userData.access_token,
				userData.username,
				userData.fullName,
				userData.email,
				userData.avatar,
				userData.roles,
				userData.permissions
			);
		}
		else
			user = null;
		return user;
	}

	// check when user typing URL without authenticate
	checkAccess(functionId: string) {
		var user = this.getLoggedInUser();
		var roles: any[] = JSON.parse(user.roles);
		var permissions: any[] = JSON.parse(user.permissions);
		var hasPermission: number = permissions.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
		if (hasPermission != -1 || roles.findIndex(x => x == "SuperAdmin") != -1)
			return true;
		return false;
	}

	// check for button
	hasPermission(functionId: string, action: string): boolean {
		var user = this.getLoggedInUser();
		var roles: any[] = JSON.parse(user.roles);
		var permissions: any[] = JSON.parse(user.permissions);
		var result: boolean = false;
		switch (action) {
			case 'create':
				var hasPermission: number = permissions.findIndex(x => x.FunctionId == functionId && x.CanCreate == true);
				if (hasPermission != -1 || roles.findIndex(x => x == "SuperAdmin") != -1)
					result = true;
				break;
			case 'update':
				var hasPermission: number = permissions.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
				if (hasPermission != -1 || roles.findIndex(x => x == "SuperAdmin") != -1)
					result = true;
				break;
			case 'delete':
				var hasPermission: number = permissions.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
				if (hasPermission != -1 || roles.findIndex(x => x == "SuperAdmin") != -1)
					result = true;
				break;
			default:
				result = false;
				break;
		}
		return result;
	}

}
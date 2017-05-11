import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SystemConstants } from './../common/system.constants';
import { MessageConstants } from './../common/message.constants';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';

@Injectable()
export class DataService {

	private headers: Headers;

	constructor(
		private _http: Http,
		private _router: Router,
		private _authService: AuthService,
		private _notificationService: NotificationService,
		private _utilityService: UtilityService
	) { }

	get(uri: string) {
		this.headers.delete('Authorization');
		this.headers.append('Authorization', 'Bearer ' + this._authService.getLoggedInUser().access_token);
		return this._http.get(SystemConstants.BASE_API + uri, { headers: this.headers })
			.map(this.extractData)
			.catch(this.handleError);
	}

	post(uri: string, data?: any) {
		this.headers.delete('Authorization');
		this.headers.append('Authorization', 'Bearer ' + this._authService.getLoggedInUser().access_token);
		return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers })
			.map(this.extractData)
			.catch(this.handleError);
	}

	put(uri: string, data?: any) {
		this.headers.delete('Authorization');
		this.headers.append('Authorization', 'Bearer ' + this._authService.getLoggedInUser().access_token);
		return this._http.put(SystemConstants.BASE_API + uri, data, { headers: this.headers })
			.map(this.extractData)
			.catch(this.handleError);
	}

	delete(uri: string, key: string, id: string) {
		this.headers.delete('Authorization');
		this.headers.append('Authorization', 'Bearer ' + this._authService.getLoggedInUser().access_token);
		return this._http.delete(SystemConstants.BASE_API + uri + '/?' + key + '=' + id, { headers: this.headers })
			.map(this.extractData)
			.catch(this.handleError);
	}

	postFile(uri: string, data?: any) {
		let newHeaders = new Headers();
		newHeaders.append('Authorization', 'Bearer ' + this._authService.getLoggedInUser().access_token);
		return this._http.post(SystemConstants.BASE_API + uri, data, { headers: this.headers })
			.map(this.extractData)
			.catch(this.handleError);
	}

	private extractData(res: Response) {
		return res.json() || {};
	}

	private handleError(error: Response | any) {
		if (error.status == 401) {
			localStorage.removeItem(SystemConstants.CURRENT_USER);
			this._notificationService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
			this._utilityService.navigateToLogin();
		} else {
			let errMsg = (error.message) ? error.message : (error.status ? `${error.status} - ${error.statusText}` : 'Lỗi hệ thống');
			this._notificationService.printErrorMessage(errMsg);
			console.error(errMsg);
			return Observable.throw(errMsg);
		}
	}

}

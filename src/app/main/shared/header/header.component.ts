import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from './../../../core/domain/loggedin.user';
import { SystemConstants } from './../../../core/common/system.constants';
import { UtilityService } from './../../../core/services/utility.service';
import { AuthService } from './../../../core/services/auth.service';
import { UrlConstants } from './../../../core/common/url.constants';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	public user: LoggedInUser;
	public baseFolder: string = SystemConstants.BASE_API;

	constructor(
		private _authService: AuthService,
		private _utilityService: UtilityService
	) { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
	}

	logout() {
		this._authService.logout();
		this._utilityService.navigate(UrlConstants.LOGIN);
	}

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './../core/services/auth.service';
import { UrlConstants } from './../core/common/url.constants';
import { SystemConstants } from './../core/common/system.constants';
import { UtilityService } from './../core/services/utility.service';
import { LoggedInUser } from './../core/domain/loggedin.user';
import { GlobalService } from './../core/services/global.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	public user: LoggedInUser;
	public baseFolder: string = SystemConstants.BASE_API;

	constructor(
		public _authService: AuthService,
		public _utilityService: UtilityService,
		public _globalService: GlobalService
	) { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
	}

	logout() {
		this._authService.logout();
		this._utilityService.navigate(UrlConstants.LOGIN);
	}

}

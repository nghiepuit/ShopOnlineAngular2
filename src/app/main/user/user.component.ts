import { Component, OnInit } from '@angular/core';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { Router } from '@angular/router';
import { GlobalService } from './../../core/services/global.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	public pageIndex: number = 1;
	public pageSize: number = 10;
	public pageDisplay: number = 10;
	public filter: string = '';
	public users: any[];
	public totalRow: number;
	public key: string;
	public value: number = 1;
	public baseFolder : string = SystemConstants.BASE_API;

	constructor(
		public _dataService: DataService,
		public _notificationService: NotificationService,
		public _router : Router,
		public _authService : AuthService,
		public _utilityService : UtilityService,
		public _globalService : GlobalService
	) { 
		if(!_authService.checkAccess('USER')){
			_utilityService.navigateToLogin();
		}
	}

	ngOnInit() {
		this._globalService.isLoading = true;
		this.loadData();
	}

	loadData() {
		this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
			.subscribe((response: any) => {
				this.users = response.Items;
				this.pageIndex = response.PageIndex;
				this.pageSize = response.PageSize;
				this.totalRow = response.TotalRows;
				this._globalService.isLoading = false;
			});
	}

	pageChanged($event) {
		this.pageIndex = $event.page;
		this.loadData();
	}

	setPageSize(pageSize) {
		this.pageSize = pageSize;
		this.loadData();
	}

	deleteUser(id: any) {
		this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteUserConfirm(id));
	}

	deleteUserConfirm(id: any) {
		this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: any) => {
			this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
			this.loadData();
		}, error => this._dataService.handleError(error));
	}

	sort(key: string) {
		this.key = key;
		this.value = -(this.value);
	}

	editUser(id: any) {
		this._router.navigate(['main/user/form',id]);
	}

}

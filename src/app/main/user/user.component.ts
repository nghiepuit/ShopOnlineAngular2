import { Component, OnInit } from '@angular/core';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { Router } from '@angular/router';

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
	key: string;
	value: number = 1;

	constructor(
		private _dataService: DataService,
		private _notificationService: NotificationService,
		private _router : Router
	) { }

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
			.subscribe((response: any) => {
				this.users = response.Items;
				this.pageIndex = response.PageIndex;
				this.pageSize = response.PageSize;
				this.totalRow = response.TotalRows;
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
		this._dataService.delete('/api/appRole/delete', 'id', id).subscribe((response: any) => {
			this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
			this.loadData();
		});
	}

	sort(key: string) {
		this.key = key;
		this.value = -(this.value);
	}

	editUser(id: any) {
		this._router.navigate(['main/role/form',id]);
	}

}

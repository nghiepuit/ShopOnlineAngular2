import { Component, OnInit } from '@angular/core';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

	public pageIndex: number = 1;
	public pageSize: number = 10;
	public pageDisplay: number = 10;
	public filter: string = '';
	public items: any[];
	public totalRow: number;
	key: string;
	value: number = 1;

	constructor(
		private _dataService: DataService,
		private _notificationService: NotificationService,
		private _router: Router
	) { }

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
			.subscribe((response: any) => {
				this.items = response.Items;
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

	deleteRole(id: any) {
		this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteRoleConfirm(id));
	}

	deleteRoleConfirm(id: any) {
		this._dataService.delete('/api/appRole/delete', 'id', id).subscribe((response: any) => {
			this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
			this.loadData();
		}, error => {
			this._dataService.handleError(error)
		});
	}

	sort(key: string) {
		this.key = key;
		this.value = -(this.value);
	}

	editRole(id: any) {
		this._router.navigate(['main/role/form', id]);
	}

}

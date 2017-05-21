import { Component, OnInit } from '@angular/core';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-product-category',
	templateUrl: './product-category.component.html',
	styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

	public pageIndex: number = 1;
	public pageSize: number = 10;
	public pageDisplay: number = 10;
	public keyword: string = '';
	public pcs: any[];
	public totalRow: number;
	public key: string;
	public value: number = 1;

	constructor(
		private _dataService: DataService,
		private _notificationService: NotificationService,
		private _router : Router
	) { }

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this._dataService.get('/api/productcategory/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.keyword)
			.subscribe((response: any) => {
				this.pcs = response.Items;
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

	sort(key: string) {
		this.key = key;
		this.value = -(this.value);
	}

	deletePC(id: any) {
		this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deletePCConfirm(id));
	}

	deletePCConfirm(id: any) {
		this._dataService.delete('/api/productcategory/delete', 'id', id).subscribe((response: any) => {
			this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
			this.loadData();
		}, error => this._dataService.handleError(error));
	}

}

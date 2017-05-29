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
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

	public pageIndex: number = 1;
	public pageSize: number = 20;
	public pageDisplay: number = 10;
	public filter: string = '';
	public filterCategoryID: number = null;
	public products: any[];
	public totalRow: number;
	public key: string;
	public value: number = 1;
	public baseFolder: string = SystemConstants.BASE_API;

	constructor(
		public _dataService: DataService,
		public _notificationService: NotificationService,
		public _router: Router,
		public _authService: AuthService,
		public _utilityService: UtilityService,
		public _globalService: GlobalService
	) {
	}

	ngOnInit() {
		this._globalService.isLoading = true;
		this.loadData();
	}

	loadData() {
		this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter + '&categoryId=' + this.filterCategoryID)
			.subscribe((response: any) => {
				this.products = response.Items;
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

	sort(key: string) {
		this.key = key;
		this.value = -(this.value);
	}

}

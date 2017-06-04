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
	public productCategories: any[];
	public totalRow: number;
	public key: string;
	public value: number = 1;
	public baseFolder: string = SystemConstants.BASE_API;
	// Search
	public searchValue: string = '';
	public pcSearchValue: string = '';
	// Delete Multi
	public isCheckAll: boolean = false;
	public checkedIds: boolean[] = null;

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
		this.loadProductCategories();
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

	loadProductCategories() {
		this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
			this.productCategories = response;
		}, error => this._dataService.handleError(error));
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

	public delete(id: string) {
		this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
			this._dataService.delete('/api/product/delete', 'id', id).subscribe((response: any) => {
				this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
				this.loadData();
			}, error => this._dataService.handleError(error));
		});
	}

	deleteMulti() {
		let productChecked = this.products.filter(x => x.checked);
		this.checkedIds = [];
		for (var i = 0; i < productChecked.length; ++i)
			this.checkedIds.push(productChecked[i]["ID"]);
		if (this.checkedIds.length > 0) {
			this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
				this._dataService.delete('/api/product/deletemulti', 'checkedProducts', JSON.stringify(this.checkedIds)).subscribe((response: any) => {
					this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
					this.loadData();
				}, error => this._dataService.handleError(error));
			});
		}else{
			this._notificationService.printErrorMessage(MessageConstants.PLEASE_CHOOSE_ITEM_YOU_WANT_DELETE);
		}
	}

	checkAll() {
		this.isCheckAll = !this.isCheckAll;
		this.products.forEach((item, index) => {
			item.checked = this.isCheckAll;
		});
	}

	edit(id : any){
		this._router.navigate(['main/product/form', id]);
	}

}

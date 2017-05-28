import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { Router } from '@angular/router';
import { TreeComponent } from 'angular-tree-component';
import { UtilityService } from '../../core/services/utility.service';

@Component({
	selector: 'app-product-category',
	templateUrl: './product-category.component.html',
	styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

	@ViewChild(TreeComponent)
	private treeFunction: TreeComponent;
	public _productCategoryHierachy: any[];
	public filter: string = '';

	constructor(
		private _dataService: DataService,
		private _notificationService: NotificationService,
		private _router : Router,
		private _utilityService: UtilityService
	) { }

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this._dataService.get('/api/productCategory/getall?filter=' + this.filter)
			.subscribe((response: any) => {
				this._productCategoryHierachy = this._utilityService.UnflattenProductCategory(response);
			}, error => this._dataService.handleError(error));
	}

	delete(id: any) {
		this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
	}

	deleteConfirm(id: any) {
		this._dataService.delete('/api/productCategory/delete', 'id', id).subscribe((response: any) => {
			this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
			this.loadData();
		}, error => this._dataService.handleError(error));
	}

	edit(id : any){
		this._router.navigate(['main/product-category/form', id]);
	}

}

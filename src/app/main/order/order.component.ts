import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { AuthService } from '../../core/services/auth.service';

import { MessageConstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { UploadService } from '../../core/services/upload.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { Router } from '@angular/router';
declare var moment: any;
@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

	/*Declare modal */
	@ViewChild('addEditModal') public addEditModal: ModalDirective;
	/*Product manage */
	public baseFolder: string = SystemConstants.BASE_API;
	public totalRow: number;
	public pageIndex: number = 1;
	public pageSize: number = 20;
	public pageDisplay: number = 10;

	public filterCustomerName: string = '';
	public filterStartDate: string = '';
	public filterPaymentStatus: string = '';
	public filterEndDate: string = '';

	public orders: any[];
	public dateOptions: any = {
		locale: { format: 'DD/MM/YYYY' },
		alwaysShowCalendars: false,
		singleDatePicker: true
	};
	constructor(
		public _authenService: AuthService,
		private _dataService: DataService,
		private notificationService: NotificationService,
		private utilityService: UtilityService, private uploadService: UploadService) {
	}

	ngOnInit() {
		this.search();

	}

	public search() {
		this._dataService.get('/api/order/getlistpaging?page=' + this.pageIndex
			+ '&pageSize=' + this.pageSize + '&startDate=' + this.filterStartDate
			+ '&endDate=' + this.filterEndDate + '&customerName=' + this.filterCustomerName
			+ '&paymentStatus=' + this.filterPaymentStatus)
			.subscribe((response: any) => {
				console.log(response.Items);
				this.orders = response.Items;
				this.pageIndex = response.PageIndex;
			}, error => this._dataService.handleError(error));
	}
	public reset() {
		this.filterCustomerName = '';
		this.filterEndDate = '';
		this.filterStartDate = '';
		this.filterPaymentStatus = '';
		this.search();
	}

	public delete(id: string) {
		this.notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
			this._dataService.delete('/api/order/delete', 'id', id).subscribe((response: any) => {
				this.notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
				this.search();
			}, error => this._dataService.handleError(error));
		});
	}
	public pageChanged(event: any): void {
		this.pageIndex = event.page;
		this.search();
	}
	public changeStartDate(value: any) {
		this.filterStartDate = moment(new Date(value.end._d)).format('DD/MM/YYYY');
	}
	public changeEndDate(value: any) {
		this.filterEndDate = moment(new Date(value.end._d)).format('DD/MM/YYYY');
	}

}
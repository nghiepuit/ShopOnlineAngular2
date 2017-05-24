import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageConstants } from '../../core/common/message.constants';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-function',
	templateUrl: './function.component.html',
	styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

	@ViewChild(TreeComponent)
	private treeFunction: TreeComponent;
	@ViewChild('permissionModal')
	public permissionModal: ModalDirective;
	public _functionHierachy: any[];
	public _functions: any[];
	public filter: string = '';
	// permission
	public functionId: string;
	public _permission: any[];

	constructor(
		private _dataService: DataService,
		private _notificationService: NotificationService,
		private _utilityService: UtilityService,
		private _router: Router
	) { }

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this._dataService.get('/api/function/getall?filter=' + this.filter)
			.subscribe((response: any) => {
				this._functions = response.filter(x => x.ParentId == null);
				this._functionHierachy = this._utilityService.Unflatten(response);
			}, error => this._dataService.handleError(error));
	}

	edit(id: any) {
		this._router.navigate(['main/func/form', id]);
	}

	delete(id: any) {
		this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
	}

	deleteConfirm(id: any) {
		this._dataService.delete('/api/function/delete', 'id', id).subscribe((response: any) => {
			this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
			this.loadData();
		}, error => this._dataService.handleError(error));
	}

	showPermission(id: string) {
		this._dataService.get('/api/appRole/getAllPermission?functionId=' + id).subscribe((response: any[]) => {
			this.functionId = id;
			this._permission = response;
			this.permissionModal.show();
		}, error => this._dataService.handleError(error));
	}

	savePermission(valid: boolean, _permission: any[]) {
		if (valid) {
			let data = {
				Permissions: this._permission,
				FunctionId: this.functionId
			}
			this._dataService.post('/api/appRole/savePermission', JSON.stringify(data)).subscribe((response: any) => {
				this._notificationService.printSuccessMessage(response);
				this.permissionModal.hide();
			}, error => this._dataService.handleError(error));
		}
	}

}

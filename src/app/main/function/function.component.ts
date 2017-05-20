import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';
import { MessageConstants } from '../../core/common/message.constants';
import { Router } from '@angular/router';

@Component({
	selector: 'app-function',
	templateUrl: './function.component.html',
	styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

	@ViewChild(TreeComponent)
	private treeFunction: TreeComponent;

	public _functionHierachy: any[];
	public _functions: any[];
	public filter: string = '';

	constructor(
		private _dataService: DataService,
		private _notificationService: NotificationService,
		private _utilityService: UtilityService,
		private _router : Router
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

	edit(id : any){
		this._router.navigate(['main/func/form',id]);
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

}

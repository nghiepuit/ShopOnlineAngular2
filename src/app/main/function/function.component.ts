import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UtilityService } from '../../core/services/utility.service';

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
		private _utilityService: UtilityService
	) { }

	ngOnInit() {
		this.search();
	}

	search() {
		this._dataService.get('/api/function/getall?filter=' + this.filter)
			.subscribe((response: any) => {
				this._functions = response.filter(x => x.ParentId == null);
				this._functionHierachy = this._utilityService.Unflatten(response);
			}, error => this._dataService.handleError(error));
	}

}

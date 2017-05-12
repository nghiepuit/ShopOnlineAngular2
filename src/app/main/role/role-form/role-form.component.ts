import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../core/services/data.service';

@Component({
	selector: 'app-role-form',
	templateUrl: './role-form.component.html',
	styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

	constructor(
		private _dataService: DataService
	) { }

	ngOnInit() {
	}

	addRole() {
		this._dataService.post('/api/appRoleadd');
	}

}

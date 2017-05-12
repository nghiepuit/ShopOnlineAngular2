import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../core/services/data.service';
import { Router } from '@angular/router';
import { NotificationService } from './../../../core/services/notification.service';
import { MessageConstants } from './../../../core/common/message.constants';

@Component({
	selector: 'app-role-form',
	templateUrl: './role-form.component.html',
	styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

	role: any = {};

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService
	) { }

	ngOnInit() {
	}

	addRole() {
		this._dataService.post('/api/appRole/add', JSON.stringify(this.role)).subscribe((response: any) => {
			this._router.navigate(['main/role/index']);
			this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	onSubmit(valid: boolean) {
		if (valid) {
			if (this.role.id == undefined) {
				this.addRole();
			} else {
				console.log('edit role');
			}
		}
	}

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './../../../core/services/data.service';
import { NotificationService } from './../../../core/services/notification.service';
import { MessageConstants } from './../../../core/common/message.constants';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-role-form',
	templateUrl: './role-form.component.html',
	styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit, OnDestroy {

	role: any = {};
	subscriptionParams: Subscription;

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
	) { }

	getRoleById(id: any) {
		this._dataService.get('/api/appRole/detail/' + id).subscribe((response: any) => {
			this.role = {
				Id : response.Id,
				Name : response.Name,
				Description : response.Description
			}
		}, error => {
			this._dataService.handleError(error);
		});
	}

	ngOnInit() {
		this.subscriptionParams = this._activatedRoute.params.subscribe((params: Params) => {
			let id: any = params['id'];
			this.getRoleById(id);
		});
	}

	ngOnDestroy() {
		if (this.subscriptionParams)
			this.subscriptionParams.unsubscribe();
	}

	addRole() {
		this._dataService.post('/api/appRole/add', JSON.stringify(this.role)).subscribe((response: any) => {
			this._router.navigate(['main/role/index']);
			this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	editRole(){
		this._dataService.put('/api/appRole/update', JSON.stringify(this.role)).subscribe((response: any) => {
			this._router.navigate(['main/role/index']);
			this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	onSubmit(valid: boolean) {
		if (valid) {
			if (this.role.Id == undefined) {
				this.addRole();
			} else {
				this.editRole();
			}
		}
	}

}

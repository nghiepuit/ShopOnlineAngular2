import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { DataService } from './../../../core/services/data.service';
import { UploadService } from './../../../core/services/upload.service';
import { NotificationService } from './../../../core/services/notification.service';
import { MessageConstants } from './../../../core/common/message.constants';
import { SystemConstants } from './../../../core/common/system.constants';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var moment : any;

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

	@ViewChild('avatar') avatar;
	public user: any = {};
	public myRoles: string[] = [];
	public allRoles: IMultiSelectOption[] = [];
	public roles: any[];
	public dateOptions: any = {
		locale: {
			format: 'DD/MM/YYYY',
			"monthNames": [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		alwaysShowCalendars: false,
		singleDatePicker: true,
		showDropdowns: true
	};
	public subscriptionParams: Subscription;
	public baseFolder : string = SystemConstants.BASE_API;

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
		private _uploadService: UploadService
	) { }

	ngOnInit() {
		this.loadRoles();
		this.subscriptionParams = this._activatedRoute.params.subscribe((params: Params) => {
			let id: any = params['id'];
			this.getUserById(id);
		});
	}

	ngOnDestroy() {
		if (this.subscriptionParams)
			this.subscriptionParams.unsubscribe();
	}

	getUserById(id: any) {
		this._dataService.get('/api/appUser/detail/' + id).subscribe((response: any) => {
			this.user = response;
			for(let role of response.Roles){
				this.myRoles.push(role);
			}
			this.user.BirthDay = moment(new Date(this.user.BirthDay)).format('DD/MM/YYYY');
		}, error => {
			this._dataService.handleError(error);
		});
	}

	addUser() {
		console.log(this.user);
		this._dataService.post('/api/appUser/add', JSON.stringify(this.user)).subscribe((response: any) => {
			this._router.navigate(['main/user/index']);
			this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	editUser(){
		this._dataService.put('/api/appUser/update', JSON.stringify(this.user)).subscribe((response: any) => {
			console.log(this.user);
			this._router.navigate(['main/user/index']);
			this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	onSubmit(valid: boolean) {
		if (valid) {
			this.user.Roles = this.myRoles;
			let fi = this.avatar.nativeElement;
			if (fi.files.length > 0) {
				this._uploadService.postWithFile('/api/upload/saveImage', null, fi.files).then((imageUrl: string) => {
					this.user.Avatar = imageUrl;
				}).then(() => {
					this.saveData();
				});
			} else {
				this.saveData();
			}
		}
	}

	saveData() {
		if (this.user.Id == undefined) {
			this.addUser();
		} else {
			this.editUser();
		}
	}

	loadRoles() {
		this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
			this.allRoles = [];
			for (let role of response) {
				this.allRoles.push({ id: role.Name, name: role.Description });
			}
		}, error => this._dataService.handleError(error));
	}

	selectGender(event) {
		this.user.Gender = event.target.value;
	}

	selectedDate(event){
		console.log(event);
		this.user.BirthDay = moment(new Date(event.end)).format('DD/MM/YYYY');
	}

}

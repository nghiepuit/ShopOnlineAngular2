import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { DataService } from './../../../core/services/data.service';
import { UploadService } from './../../../core/services/upload.service';
import { NotificationService } from './../../../core/services/notification.service';
import { MessageConstants } from './../../../core/common/message.constants';
import { SystemConstants } from './../../../core/common/system.constants';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from './../../../core/validators/validators.class';
declare var moment: any;

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

	@ViewChild('Avatar') Avatar;
	public user: any = {};
	public myRoles: string[] = [];
	public allRoles: IMultiSelectOption[] = [];
	public roles: any[];
	public subscriptionParams: Subscription;
	public baseFolder: string = SystemConstants.BASE_API;
	public frmUser: FormGroup;
	public frmValid: boolean = true;

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
		private _uploadService: UploadService,
		private _formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.subscriptionParams = this._activatedRoute.params.subscribe((params: Params) => {
			this.loadRoles();
			let id: any = params['id'];
			if (id) {
				this.getUserById(id);
				this.createFormEdit();
			} else {
				this.createFormAdd();
			}
		});
	}

	ngOnDestroy() {
		if (this.subscriptionParams)
			this.subscriptionParams.unsubscribe();
	}

	createFormAdd() {
		this.frmUser = this._formBuilder.group({
			FullName: [this.user.FullName, [
				Validators.required,
				Validators.minLength(6),
			]],
			Email: [this.user.Email, [
				MyValidators.emailValidators
			]],
			UserName: [this.user.UserName, [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20),
			]],
			Address: [this.user.Address],
			Password: [this.user.Password, [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20),
				MyValidators.passwordValidators
			]],
			ConfirmPassword: [this.user.ConfirmPassword, [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20),
				MyValidators.passwordValidators
			]],
			PhoneNumber: [this.user.PhoneNumber],
			BirthDay: [this.user.BirthDay, [
				Validators.required
			]],
			Avatar: [this.user.Avatar],
			Gender: ['', [
				Validators.required
			]],
			Roles: ['']
		}, { validator: MyValidators.matchingPasswords('Password', 'ConfirmPassword') });

		this.frmUser.valueChanges.subscribe(
			(value: any) => {
				// console.log(value);
			}
		);
	}

	createFormEdit() {
		this.frmUser = this._formBuilder.group({
			FullName: [this.user.FullName, [
				Validators.required,
				Validators.minLength(6),
			]],
			Email: [this.user.Email, [
				MyValidators.emailValidators
			]],
			UserName: [this.user.UserName, [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20),
			]],
			Address: [this.user.Address],
			Password: [this.user.Password, [
				MyValidators.passwordValidators
			]],
			ConfirmPassword: [this.user.ConfirmPassword, [
				MyValidators.passwordValidators
			]],
			PhoneNumber: [this.user.PhoneNumber],
			BirthDay: [this.user.BirthDay, [
				Validators.required
			]],
			Avatar: [this.user.Avatar],
			Gender: ['', [
				Validators.required
			]],
			Roles: ['']
		}, { validator: MyValidators.matchingPasswords('Password', 'ConfirmPassword') });

		this.frmUser.valueChanges.subscribe(
			(value: any) => {
				// console.log(value);
			}
		);
	}

	getUserById(id: any) {
		this._dataService.get('/api/appUser/detail/' + id).subscribe((response: any) => {
			this.user = response;
			for (let role of response.Roles) {
				this.myRoles.push(role);
			}
			this.user.BirthDay = moment(new Date(this.user.BirthDay)).format('DD/MM/YYYY');
		}, error => {
			this._dataService.handleError(error);
		});
	}

	addUser() {
		this._dataService.post('/api/appUser/add', JSON.stringify(this.user)).subscribe((response: any) => {
			this._router.navigate(['main/user/index']);
			this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
		}, error => {
			if (error.status == 409) {
				this._notificationService.printErrorMessage(MessageConstants.USERNAME_EMAIL_EXISTING);
			}
			this._dataService.handleError(error);
		});
	}

	editUser() {
		this._dataService.put('/api/appUser/update', JSON.stringify(this.user)).subscribe((response: any) => {
			this._router.navigate(['main/user/index']);
			this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	onSubmit(valid: boolean) {
		if (valid) {
			let fi = this.Avatar.nativeElement;
			//  Validate file extention
			let arr = fi.files[0] ? fi.files[0].name.split('.') : '';
			if (arr) {
				let ext = arr[arr.length - 1];
				if (ext.indexOf('png') == -1 && ext.indexOf('jpg') == -1 && ext.indexOf('jpeg') == -1) {
					this.frmValid = false;
				} else {
					this.frmValid = true;
				}
			} else {
				this.frmValid = true;
			}
			if (this.frmValid) {
				this.user.Roles = this.myRoles;
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

	selectedDate(event) {
		this.user.BirthDay = moment(new Date(event.end)).format('DD/MM/YYYY');
	}

}

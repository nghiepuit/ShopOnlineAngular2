import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from './../../../core/services/data.service';
import { NotificationService } from './../../../core/services/notification.service';
import { MessageConstants } from './../../../core/common/message.constants';
import { SystemConstants } from './../../../core/common/system.constants';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from './../../../core/validators/validators.class';
declare var moment: any;

@Component({
	selector: 'app-function-form',
	templateUrl: './function-form.component.html',
	styleUrls: ['./function-form.component.css']
})
export class FunctionFormComponent implements OnInit, OnDestroy {

	public _functions: any[];
	public function: any = {};
	public subscriptionParams: Subscription;
	public frmFunction: FormGroup;
	public frmValid: boolean = true;
	public isAdding: boolean = true;

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.loadParentFunctions();
		this.initilize();
	}

	initilize() {
		this.subscriptionParams = this._activatedRoute.params.subscribe((params: Params) => {
			this.createForm();
			let id: any = params['id'];
			if (id) {
				this.isAdding = false;
				this.getFunctionById(id);
			}
		});
	}

	loadParentFunctions() {
		this._dataService.get('/api/function/getall?filter=')
			.subscribe((response: any) => {
				this._functions = response.filter(x => x.ParentId == null);
			}, error => this._dataService.handleError(error));
	}

	ngOnDestroy() {
		if (this.subscriptionParams)
			this.subscriptionParams.unsubscribe();
	}

	createForm() {
		this.frmFunction = this._formBuilder.group({
			ID: [this.function.ID, [
				Validators.required,
				Validators.minLength(6),
			]],
			Name: [this.function.Name, [
				Validators.required,
				Validators.minLength(6),
			]],
			URL: [this.function.URL, [
				Validators.required
			]],
			DisplayOrder: [this.function.DisplayOrder, [
				Validators.required
			]],
			ParentId: [this.function.ParentId],
			IconCss: [this.function.IconCss, [
				Validators.required
			]],
			Status: [this.function.Status]
		});

		this.frmFunction.valueChanges.subscribe(
			(value: any) => {
				// console.log(value);
			}
		);
	}

	getFunctionById(id: any) {
		this._dataService.get('/api/function/detail/' + id).subscribe((response: any) => {
			this.function = response;
		}, error => {
			this._dataService.handleError(error);
		});
	}

	onSubmit(valid: boolean) {
		if (valid) {
			if(this.function.ParentId == -1){
				this.function.ParentId = null;
			}
			if (this.isAdding) {
				this.addFunction();
			} else {
				this.editFunction();
			}
		}
	}

	addFunction() {
		this._dataService.post('/api/function/add', JSON.stringify(this.function)).subscribe((response: any) => {
			this._router.navigate(['main/func/index']);
			this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	editFunction() {
		this._dataService.put('/api/function/update', JSON.stringify(this.function)).subscribe((response: any) => {
			this._router.navigate(['main/func/index']);
			this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

}

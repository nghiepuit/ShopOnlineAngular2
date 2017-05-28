import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from './../../../core/services/data.service';
import { NotificationService } from './../../../core/services/notification.service';
import { MessageConstants } from './../../../core/common/message.constants';
import { SystemConstants } from './../../../core/common/system.constants';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from './../../../core/validators/validators.class';
import { UploadService } from './../../../core/services/upload.service';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
	selector: 'app-product-category-form',
	templateUrl: './product-category-form.component.html',
	styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit, OnDestroy {

	@ViewChild('Image') Image;
	public pc: any = {};
	public subscriptionParams: Subscription;
	public frmPC: FormGroup;
	public frmValid: boolean = true;
	public _productCategories: any[];
	public baseFolder: string = SystemConstants.BASE_API;

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _uploadService: UploadService,
		private _utilityService: UtilityService
	) { }

	ngOnInit() {
		this.subscriptionParams = this._activatedRoute.params.subscribe((params: Params) => {
			this.getListDropdown();
			this.createForm();
			let id: any = params['id'];
			if (id) {
				this.getPCById(id);
			}
		});
	}

	ngOnDestroy() {
		if (this.subscriptionParams)
			this.subscriptionParams.unsubscribe();
	}

	getListDropdown() {
		this._dataService.get('/api/productcategory/getallhierachy')
			.subscribe((response: any) => {
				this._productCategories = response;
			}, error => this._dataService.handleError(error));
	}

	createForm() {
		this.frmPC = this._formBuilder.group({
			Name: [this.pc.Name, [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(256)
			]],
			Alias: [this.pc.Alias, [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(256)
			]],
			Description: [this.pc.Description],
			ParentID: [this.pc.ParentID],
			DisplayOrder: [this.pc.DisplayOrder],
			Image: [this.pc.Image],
			MetaKeyword: [this.pc.MetaKeyword],
			MetaDescription: [this.pc.MetaDescription],
			Status: [this.pc.Status],
			HomeFlag: [this.pc.HomeFlag]
		});

		this.frmPC.valueChanges.subscribe(
			(value: any) => {
				this.createAlias(value.Name);
			}
		);
	}

	getPCById(id: any) {
		this._dataService.get('/api/productcategory/getbyid/' + id).subscribe((response: any) => {
			this.pc = response;
		}, error => {
			this._dataService.handleError(error);
		});
	}

	onSubmit(valid: boolean) {
		if (valid) {
			let fi = this.Image.nativeElement;
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
			if (fi.files.length > 0) {
				this._uploadService.postWithFile('/api/upload/saveImage', null, fi.files).then((imageUrl: string) => {
					this.pc.Image = imageUrl;
				}).then(() => {
					this.saveData();
				});
			} else {
				this.saveData();
			}
		}
	}

	createAlias(name: string) {
		this.pc.Alias = this._utilityService.MakeSeoTitle(name);
	}

	saveData() {
		if (this.pc.ID == undefined) {
			this.addPC();
		} else {
			this.editPC();
		}
	}

	addPC() {
		this._dataService.post('/api/productcategory/create', JSON.stringify(this.pc)).subscribe((response: any) => {
			this._router.navigate(['main/product-category/index']);
			this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
		}, error => {
			if (error.status == 409) {
				this._notificationService.printErrorMessage(MessageConstants.USERNAME_EMAIL_EXISTING);
			}
			this._dataService.handleError(error);
		});
	}

	editPC() {
		this._dataService.put('/api/productcategory/update', JSON.stringify(this.pc)).subscribe((response: any) => {
			this._router.navigate(['main/product-category/index']);
			this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

}

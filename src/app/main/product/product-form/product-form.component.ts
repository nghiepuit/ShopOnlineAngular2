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
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

	@ViewChild('ThumbnailImage') ThumbnailImage;
	public productCategories: any[];
	public product: any = {};
	public subscriptionParams: Subscription;
	public frmProduct: FormGroup;
	public frmValid: boolean = true;
	public baseFolder: string = SystemConstants.BASE_API;
	// More Image
	public productImages: any = [];
	@ViewChild("imagePath") imagePath;
	public imageProduct: any = {};
	public frmImageValid: boolean = true;

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _uploadService: UploadService,
		private _utilityService: UtilityService
	) {

	}

	ngOnInit() {
		this.subscriptionParams = this._activatedRoute.params.subscribe((params: Params) => {
			this.loadProductCategories();
			let id: any = params['id'];
			if (id) {
				this.getProductById(id);
			}
			this.createForm();
		});
	}

	ngOnDestroy() {
		if (this.subscriptionParams)
			this.subscriptionParams.unsubscribe();
	}

	loadProductCategories() {
		this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
			this.productCategories = response;
		}, error => this._dataService.handleError(error));
	}

	createForm() {
		this.frmProduct = this._formBuilder.group({
			Name: [this.product.Name, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(256)
			]],
			Alias: [this.product.Alias, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(256)
			]],
			CategoryID: [this.product.CategoryID, [
				Validators.required]
			],
			ThumbnailImage: [this.product.ThumbnailImage],
			Price: [this.product.Price, [
				Validators.required
			]],
			IncludedVAT: [this.product.IncludedVAT],
			OriginalPrice: [this.product.OriginalPrice],
			PromotionPrice: [this.product.PromotionPrice],
			Status: [this.product.Status],
			HomeFlag: [this.product.HomeFlag],
			HotFlag: [this.product.HotFlag],
			Description: [this.product.Description],
			Warranty: [this.product.Warranty],
			Content: [this.product.Content],
			MetaKeyword: [this.product.MetaKeyword],
			MetaDescription: [this.product.MetaDescription],
			Tags: [this.product.Tags]
		});

		this.frmProduct.valueChanges.subscribe(
			(value: any) => {
				this.createAlias(value.Name);
			}
		);
	}

	getProductById(id: any) {
		this._dataService.get('/api/product/detail/' + id).subscribe((response: any) => {
			this.product = response;
			this.loadProductImages(id);
			this.imageProduct = {
				ProductId: id
			};
		}, error => {
			this._dataService.handleError(error);
		});
	}

	createAlias(name: string) {
		this.product.Alias = this._utilityService.MakeSeoTitle(name);
	}

	onSubmit(valid: boolean) {
		if (valid) {
			let fi = this.ThumbnailImage.nativeElement;
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
				this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl: string) => {
					this.product.ThumbnailImage = imageUrl;
				}).then(() => {
					this.saveData();
				});
			} else {
				this.saveData();
			}
		}
	}

	saveData() {
		if (this.product.ID == undefined) {
			this.addProduct();
		} else {
			this.editProduct();
		}
	}

	addProduct() {
		this._dataService.post('/api/product/add', JSON.stringify(this.product)).subscribe((response: any) => {
			this._router.navigate(['main/product/index']);
			this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
		}, error => {
			if (error.status == 409) {
				this._notificationService.printErrorMessage(MessageConstants.USERNAME_EMAIL_EXISTING);
			}
			this._dataService.handleError(error);
		});
	}

	editProduct() {
		this._dataService.put('/api/product/update', JSON.stringify(this.product)).subscribe((response: any) => {
			this._router.navigate(['main/product/index']);
			this._notificationService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
		}, error => {
			this._dataService.handleError(error);
		});
	}

	keyupHandlerContentFunction(data: any) {
		this.product.Content = data;
	}

	// More Image
	loadProductImages(id: any) {
		this._dataService.get('/api/productImage/getall?productId=' + id).subscribe((response: any[]) => {
			this.productImages = response;
		}, error => this._dataService.handleError(error));
	}

	deleteImage(id: number) {
		this._notificationService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
			this._dataService.delete('/api/productImage/delete', 'id', id.toString()).subscribe((response: any) => {
				this._notificationService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
				this.loadProductImages(this.product.ID);
			}, error => this._dataService.handleError(error));
		});
	}

	saveProductImage(valid: boolean) {
		if (valid) {
			let fi = this.imagePath.nativeElement;
			//  Validate file extention
			let arr = fi.files[0] ? fi.files[0].name.split('.') : '';
			if (arr) {
				let ext = arr[arr.length - 1];
				if (ext.indexOf('png') == -1 && ext.indexOf('jpg') == -1 && ext.indexOf('jpeg') == -1) {
					this.frmImageValid = false;
				} else {
					this.frmImageValid = true;
				}
			} else {
				this.frmImageValid = true;
			}
			if (this.frmImageValid && fi.files.length > 0) {
				this._uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl: string) => {
					this.imageProduct.Path = imageUrl;
					this._dataService.post('/api/productImage/add', JSON.stringify(this.imageProduct)).subscribe((response: any) => {
						this.loadProductImages(this.imageProduct.ProductId);
						this._notificationService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
					}, error => this._dataService.handleError(error));
				});
			}
		}
	}

}

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from './../../../core/services/data.service';
import { NotificationService } from './../../../core/services/notification.service';
import { MessageConstants } from './../../../core/common/message.constants';
import { SystemConstants } from './../../../core/common/system.constants';
import { Subscription } from 'rxjs/Rx';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from './../../../core/validators/validators.class';

@Component({
	selector: 'app-product-category-form',
	templateUrl: './product-category-form.component.html',
	styleUrls: ['./product-category-form.component.css']
})
export class ProductCategoryFormComponent implements OnInit, OnDestroy {

	public pc: any = {};
	public subscriptionParams: Subscription;
	public frmPC: FormGroup;
	public frmValid: boolean = true;

	constructor(
		private _dataService: DataService,
		private _router: Router,
		private _notificationService: NotificationService,
		private _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.subscriptionParams = this._activatedRoute.params.subscribe((params: Params) => {
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
			ParentID: [this.pc.ParentID, [
				Validators.required,
				Validators.maxLength(500)
			]],
			DisplayOrder: [this.pc.DisplayOrder, [
				Validators.required
			]],
			Avatar: [this.pc.Avatar],
			MetaKeyword: [this.pc.MetaKeyword],
			MetaDescription: [this.pc.MetaDescription],
			Status: [this.pc.Status],
			HomeFlag: [this.pc.HomeFlag]
		});

		this.frmPC.valueChanges.subscribe(
			(value: any) => {
				// console.log(value);
			}
		);
	}

	getPCById(id: any) {

	}

}

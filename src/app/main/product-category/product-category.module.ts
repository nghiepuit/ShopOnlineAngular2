import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// Component
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryFormComponent } from './product-category-form/product-category-form.component';
// Service
import { DataService } from './../../core/services/data.service';
import { UploadService } from './../../core/services/upload.service';
import { NotificationService } from './../../core/services/notification.service';
// Shared
import { CoreModule } from './../../core/core.module';
// Third Party
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TreeModule } from 'angular-tree-component';

const pcRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: ProductCategoryComponent },
	{ path: 'form', component: ProductCategoryFormComponent },
	{ path: 'form/:id', component: ProductCategoryFormComponent }
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		CoreModule,
		PaginationModule,
		TreeModule,
		RouterModule.forChild(pcRoutes)
	],
	declarations: [
		ProductCategoryComponent,
		ProductCategoryFormComponent
	], providers: [
		DataService,
		NotificationService,
		UploadService
	]
})
export class ProductCategoryModule { }

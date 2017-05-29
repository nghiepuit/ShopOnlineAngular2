import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// Component
import { ProductComponent } from './product.component';
import { ProductFormComponent } from './product-form/product-form.component';
// Service
import { DataService } from './../../core/services/data.service';
import { UploadService } from './../../core/services/upload.service';
import { NotificationService } from './../../core/services/notification.service';
// Shared
import { CoreModule } from './../../core/core.module';
// Third Party
import { PaginationModule } from 'ngx-bootstrap/pagination';

const productRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: ProductComponent },
	{ path: 'form', component: ProductFormComponent },
	{ path: 'form/:id', component: ProductFormComponent }
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		CoreModule,
		PaginationModule,
		RouterModule.forChild(productRoutes)
	],
	declarations: [
		ProductComponent,
		ProductFormComponent
	],
	providers: [
		DataService,
		NotificationService,
		UploadService
	]
})
export class ProductModule { }

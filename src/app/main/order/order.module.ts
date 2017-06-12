import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// Component
import { OrderComponent } from './order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
// Service
import { DataService } from './../../core/services/data.service';
import { UploadService } from './../../core/services/upload.service';
import { NotificationService } from './../../core/services/notification.service';
// Shared
import { CoreModule } from './../../core/core.module';
// Third Party
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';

const orderRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: OrderComponent },
	{ path: 'add', component: OrderAddComponent },
	{ path: 'detail/:id', component: OrderDetailComponent }
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		CoreModule,
		PaginationModule,
		Daterangepicker,
		ModalModule,
		RouterModule.forChild(orderRoutes)
	],
	declarations: [
		OrderComponent,
		OrderAddComponent,
		OrderDetailComponent
	],
	providers: [
		DataService,
		NotificationService,
		UploadService
	]
})
export class OrderModule { }

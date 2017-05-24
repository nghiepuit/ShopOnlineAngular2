import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// Component
import { FunctionComponent } from './function.component';
import { FunctionFormComponent } from './function-form/function-form.component';
// Service
import { DataService } from './../../core/services/data.service';
import { UploadService } from './../../core/services/upload.service';
import { NotificationService } from './../../core/services/notification.service';
// Shared
import { CoreModule } from './../../core/core.module';

// Third Party
import { TreeModule } from 'angular-tree-component';
import { ModalModule } from 'ngx-bootstrap/modal';

const funcRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: FunctionComponent },
	{ path: 'form', component: FunctionFormComponent },
	{ path: 'form/:id', component: FunctionFormComponent },
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		TreeModule,
		CoreModule,
		ModalModule.forRoot(),
		RouterModule.forChild(funcRoutes)
	],
	declarations: [
		FunctionComponent,
		FunctionFormComponent
	], providers: [
		DataService,
		NotificationService,
		UploadService
	]
})
export class FunctionModule { }

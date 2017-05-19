import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// Component
import { FunctionComponent } from './function.component';
// Service
import { DataService } from './../../core/services/data.service';
import { UploadService } from './../../core/services/upload.service';
import { NotificationService } from './../../core/services/notification.service';
// Shared

// Third Party
import { TreeModule } from 'angular-tree-component';

const funcRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: FunctionComponent }
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		TreeModule,
		RouterModule.forChild(funcRoutes)
	],
	declarations: [
		FunctionComponent
	],providers: [
		DataService,
		NotificationService,
		UploadService
	]
})
export class FunctionModule { }

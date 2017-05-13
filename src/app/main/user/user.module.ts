import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from './../../core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
// Shared
import { CoreModule } from './../../core/core.module';

const userRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: UserComponent },
	{ path: 'form', component: UserFormComponent },
	{ path: 'form/:id', component: UserFormComponent },
];

@NgModule({
	imports: [
		CommonModule,
		PaginationModule,
		FormsModule,
		CoreModule,
		RouterModule.forChild(userRoutes)
	],
	providers: [
		DataService,
		NotificationService
	],
	declarations: [
		UserComponent,
		UserFormComponent
	]
})
export class UserModule { }

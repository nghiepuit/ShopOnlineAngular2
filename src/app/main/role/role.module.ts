import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from './../../core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { RoleFormComponent } from './role-form/role-form.component';
// Shared
import { CoreModule } from './../../core/core.module';

const userRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: RoleComponent },
	{ path: 'form', component: RoleFormComponent },
	{ path: 'form/:id', component: RoleFormComponent },
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
		RoleComponent,
		RoleFormComponent
	]
})
export class RoleModule { }

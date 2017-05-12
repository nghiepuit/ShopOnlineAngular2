import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from './../../core/services/data.service';
import { NotificationService } from './../../core/services/notification.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { RoleFormComponent } from './role-form/role-form.component';
// Pipe
import { SortPipe } from './../../core/pipes/sort.pipe';

const userRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: RoleComponent },
	{ path: 'form', component: RoleFormComponent }
];

@NgModule({
	imports: [
		CommonModule,
		PaginationModule,
		FormsModule,
		RouterModule.forChild(userRoutes)
	],
	providers: [
		DataService,
		NotificationService
	],
	declarations: [
		RoleComponent,
		RoleFormComponent,
		SortPipe
	]
})
export class RoleModule { }

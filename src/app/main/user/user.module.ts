import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from './../../core/services/data.service';
import { UploadService } from './../../core/services/upload.service';
import { NotificationService } from './../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Third Party
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// Shared
import { CoreModule } from './../../core/core.module';

// Pipe
import { FilterPipe } from './filter.pipe';

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
		MultiselectDropdownModule,
		ReactiveFormsModule,
		RouterModule.forChild(userRoutes)
	],
	providers: [
		DataService,
		NotificationService,
		UploadService
	],
	declarations: [
		UserComponent,
		UserFormComponent,
		FilterPipe
	]
})
export class UserModule { }

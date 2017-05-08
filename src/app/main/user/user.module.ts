import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserService } from './service/user.service';
// Flash-Message Module
import { FlashMessagesModule } from 'angular2-flash-messages';


const userRoutes: Routes = [
	{ path: '', redirectTo: 'index', pathMatch: 'full' },
	{ path: 'index', component: UserComponent }
];

@NgModule({
	imports: [
		CommonModule,
		NgxDatatableModule,
		FlashMessagesModule,
		RouterModule.forChild(userRoutes)
	],
	providers: [
		UserService
	],
	declarations: [UserComponent]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { loginRoutes } from './login.routes';
import { NotificationService } from './../core/services/notification.service';
import { AuthService } from './../core/services/auth.service';
import { UtilityService } from './../core/services/utility.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(loginRoutes)
	],
	providers: [
		NotificationService,
		AuthService,
		UtilityService
	],
	declarations: [LoginComponent]
})
export class LoginModule { }

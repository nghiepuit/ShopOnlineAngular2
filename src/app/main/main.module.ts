import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

// Service
import { NotificationService } from './../core/services/notification.service';
import { AuthService } from './../core/services/auth.service';
import { UtilityService } from './../core/services/utility.service';

import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';

@NgModule({
	imports: [
		CommonModule,
		UserModule,
		RoleModule,
		RouterModule.forChild(mainRoutes)
	],
	providers: [
		NotificationService,
		AuthService,
		UtilityService
	],
	declarations: [
		MainComponent
	]
})
export class MainModule { }

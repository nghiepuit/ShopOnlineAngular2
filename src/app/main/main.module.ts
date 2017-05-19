import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { FunctionModule } from './function/function.module';

// Service
import { NotificationService } from './../core/services/notification.service';
import { AuthService } from './../core/services/auth.service';
import { UtilityService } from './../core/services/utility.service';

// Components
import { MainComponent } from './main.component';
import { ControlMessageComponent } from './../core/components/control-message/control-message.component';
import { FormMessageComponent } from './../core/components/form-message/form-message.component';

// This Routes
import { mainRoutes } from './main.routes';

@NgModule({
	imports: [
		CommonModule,
		UserModule,
		RoleModule,
		FunctionModule,
		RouterModule.forChild(mainRoutes)
	],
	providers: [
		NotificationService,
		AuthService,
		UtilityService
	],
	declarations: [
		MainComponent,
		ControlMessageComponent,
		FormMessageComponent
	]
})
export class MainModule { }

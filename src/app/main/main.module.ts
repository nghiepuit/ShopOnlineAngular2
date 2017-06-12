import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { FunctionModule } from './function/function.module';
import { OrderModule } from './order/order.module';
import { ProductCategoryModule } from './product-category/product-category.module';

// Service
import { NotificationService } from './../core/services/notification.service';
import { AuthService } from './../core/services/auth.service';
import { UtilityService } from './../core/services/utility.service';
import { GlobalService } from './../core/services/global.service';

// Components
import { MainComponent } from './main.component';

// Shared

// This Routes
import { mainRoutes } from './main.routes';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
	imports: [
		CommonModule,
		UserModule,
		RoleModule,
		FunctionModule,
		ProductCategoryModule,
		OrderModule,
		RouterModule.forChild(mainRoutes)
	],
	providers: [
		NotificationService,
		AuthService,
		UtilityService,
		GlobalService
	],
	declarations: [
		MainComponent,
		SidebarComponent,
		HeaderComponent
	]
})
export class MainModule { }

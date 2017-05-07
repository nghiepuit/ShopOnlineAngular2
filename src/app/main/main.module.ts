import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';

import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';

@NgModule({
	imports: [
		CommonModule,
		UserModule,
		RouterModule.forChild(mainRoutes)
	],
	declarations: [MainComponent]
})
export class MainModule { }

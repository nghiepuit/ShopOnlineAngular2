import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

// Lazy loading routing module
export const mainRoutes: Routes = [
	{
		path: '', component: MainComponent, children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			// localhost:4200/main/home
			{ path: 'home', loadChildren: './home/home.module#HomeModule' },
			// localhost:4200/main/user
			{ path: 'user', loadChildren: './user/user.module#UserModule' },
			// localhost:4200/main/user
			{ path: 'role', loadChildren: './role/role.module#RoleModule' },
			// localhost:4200/main/func
			{ path: 'func', loadChildren: './function/function.module#FunctionModule' }
		]
	}
]
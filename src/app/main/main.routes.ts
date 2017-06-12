import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

// Lazy loading routing module
export const mainRoutes: Routes = [
	{
		path: '', component: MainComponent, children: [
			{ path: '', redirectTo: 'user', pathMatch: 'full' },
			// localhost:4200/main/home
			{ path: 'home', loadChildren: './home/home.module#HomeModule' },
			// localhost:4200/main/user
			{ path: 'user', loadChildren: './user/user.module#UserModule' },
			// localhost:4200/main/user
			{ path: 'role', loadChildren: './role/role.module#RoleModule' },
			// localhost:4200/main/func
			{ path: 'func', loadChildren: './function/function.module#FunctionModule' },
			// localhost:4200/main/product-category
			{ path: 'product-category', loadChildren: './product-category/product-category.module#ProductCategoryModule' },
			// localhost:4200/main/product-category
			{ path: 'product', loadChildren: './product/product.module#ProductModule' },
			// localhost:4200/main/order
			{ path: 'order', loadChildren: './order/order.module#OrderModule' }
		]
	}
]
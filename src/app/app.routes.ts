import { Routes } from '@angular/router';

export const appRoutes: Routes = [
	{ path: '', redirectTo: 'main', pathMatch: 'full' },
	{ path: 'login', loadChildren: './login/login.module#LoginModule' },
	{ path: 'main', loadChildren: './main/main.module#MainModule' }
]
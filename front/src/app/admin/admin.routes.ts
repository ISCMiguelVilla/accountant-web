import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
	{ path: '', component: AdminComponent, children: [
		{ path: '', component: MainComponent },
		{ path: 'users', loadChildren: () => import('./users/users.routes').then(r => r.routes) },
		{ path: 'currencies', loadChildren: () => import('./currencies/currencies.routes').then(r => r.routes) },
	] }
];

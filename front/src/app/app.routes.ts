import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { SingInComponent } from './public/sing-in/sing-in.component';

export const routes: Routes = [

	{ path: 'admin', loadChildren: () => import('./admin/admin.routes').then(r => r.routes) },

	{ path: 'intranet', loadChildren: () => import('./intranet/intranet.routes').then(r => r.routes) },

	{ path: 'sign-in', title: 'Sign in', component: SingInComponent },
	{ path: 'sign-up', title: 'Sign up', loadComponent: () => import('./public/sing-up/sing-up.component').then(c => c.SingUpComponent) },

	{ path: 'page-not-found', title: 'Page not found', component: PageNotFoundComponent },
	{ path: '', redirectTo: '/intranet', pathMatch: 'full' },
	{ path: '**', redirectTo: '/page-not-found' },
];

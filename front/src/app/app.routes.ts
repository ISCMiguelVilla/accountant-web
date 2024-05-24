import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { SingInComponent } from './public/sign-in/sign-in.component';
import { SignOutComponent } from './public/sign-out/sign-out.component';

export const routes: Routes = [

	{ path: 'admin', loadChildren: () => import('./admin/admin.routes').then(r => r.routes),
		canActivate: [ authGuard ]
	},

	{ path: 'intranet', loadChildren: () => import('./intranet/intranet.routes').then(r => r.routes),
		canActivate: [ authGuard ]
	},

	{ path: 'sign-in', title: 'Sign in', component: SingInComponent },
	{ path: 'sign-up', title: 'Sign up', loadComponent: () => import('./public/sign-up/sign-up.component').then(c => c.SingUpComponent) },
	{ path: 'sign-out', title: 'Sign in', component: SignOutComponent },

	{ path: 'page-not-found', title: 'Page not found', component: PageNotFoundComponent },
	{ path: '', redirectTo: '/intranet', pathMatch: 'full' },
	{ path: '**', redirectTo: '/page-not-found' },
];

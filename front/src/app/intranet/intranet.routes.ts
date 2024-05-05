import { Routes } from '@angular/router';
import { IntranetComponent } from './intranet.component';
import { MainComponent } from './home/pages/main/main.component';
import { AppLayoutComponent } from '../core/layout/app.layout.component';

export const routes: Routes = [
	{
		// path: '', component: IntranetComponent,
		path: '', component: AppLayoutComponent,
		children: [
			{ path: '', title: 'Accountant | Home', component: MainComponent, data: { breadcrumb: 'Home' } },

			{	
				path: 'accounts',
				loadChildren: () => import('./accounts/accounts.routes').then(r => r.routes),
				data: { breadcrumb: 'Accounts' }
			},
			{	
				path: 'transactions',
				loadChildren: () => import('./transactions/transactions.routes').then(r => r.routes),
				data: { breadcrumb: 'Transactions' }
			},
			{	
				path: 'schedule-transactions',
				loadChildren: () => import('./schedule-transactions/schedule-transactions.routes').then(r => r.routes),
				data: { breadcrumb: 'Schedule transactions' }
			},
		]
	}
];

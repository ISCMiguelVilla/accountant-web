import { Routes } from '@angular/router';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
	{ path: '', title: 'Accounts', component: MainComponent },
	{ path: 'create', title: 'New account', component: MaintenanceComponent },
	{ path: ':id/edit', title: 'Edit account', component: MaintenanceComponent }
];

import { Routes } from '@angular/router';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
	{ path: '',  title: 'Schedule transactions', component: MainComponent },
	{ path: 'create',  title: 'New schedule transaction', component: MaintenanceComponent },
	{ path: ':id/edit', title: 'Edit schedule transaction', component: MaintenanceComponent }
];

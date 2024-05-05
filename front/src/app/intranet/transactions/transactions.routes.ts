import { Routes } from '@angular/router';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
	{ path: '',  title: 'Transactions', component: MainComponent },
	{ path: 'create',  title: 'Add transactions', component: MaintenanceComponent },
];

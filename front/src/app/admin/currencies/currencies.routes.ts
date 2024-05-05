import { Routes } from '@angular/router';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
	{ path: '', component: MainComponent },
	{ path: 'create', component: MaintenanceComponent },
	{ path: ':id/edit', component: MaintenanceComponent }
];

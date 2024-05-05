import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [
		CommonModule,
		AppMenuitemComponent,
	],
	templateUrl: './app.menu.component.html',
	styles: ``
})
export class AppMenuComponent implements OnInit {

	model: any[] = [];

	constructor(public layoutService: LayoutService) { }

	ngOnInit() {
		this.model = [
			{
				label: 'Home',
				items: [
					{ label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/intranet'] }
				]
			},
			{
				label: 'Accounts',
				items: [
					{
						label: 'View',
						icon: 'fa-solid fa-list',
						routerLink: './accounts'
					},
					{
						label: 'Create',
						icon: 'fa-solid fa-plus',
						routerLink: './accounts/create'
					}
				]
			},
			{
				label: 'Transactions',
				icon: 'fa-solid fa-right-left',
				items: [
					{
						label: 'View',
						icon: 'fa-solid fa-list',
						routerLink: './transactions'
					},
					{
						label: 'Create',
						icon: 'fa-solid fa-plus',
						routerLink: './transactions/create'
					},
					{
						label: 'Scheduled',
						icon: 'fa-regular fa-calendar',
						items: [
							{
								label: 'View',
								icon: 'fa-solid fa-list',
								routerLink: './schedule-transactions'
							},
							{
								label: 'Create',
								icon: 'fa-solid fa-plus',
								routerLink: './schedule-transactions/create'
							},
						]
					},
				]
			}
		];
	}
}

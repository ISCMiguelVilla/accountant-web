import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { filter } from 'rxjs';

import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
	standalone: true,
	imports: [ RouterModule, SidebarModule, ButtonModule, PanelMenuModule, MenuModule, AvatarModule, AvatarGroupModule, BreadcrumbModule ],
	template: `
		<p-sidebar [(visible)]="sidebarVisible">
			<ng-template pTemplate="header">MENU</ng-template>
			<ng-template pTemplate="content">
				<p-menu [model]="items"></p-menu>
			</ng-template>
			<ng-template pTemplate="footer">
			<p-avatar label="V" styleClass="mr-2" size="large" [style]="{ 'background-color': '#2196F3', color: '#ffffff' }" shape="circle"></p-avatar>
			</ng-template>
		</p-sidebar>
		<div class="flex flex-row justify-content-center">
			<div class="block card p-fluid lg:w-full xl:w-8 p-2">
				<p-button (click)="sidebarVisible = true" icon="pi pi-arrow-right"><i class="fa-solid fa-bars"></i></p-button>
				<p-breadcrumb class="max-w-full" [model]="bread_items" [home]="home"></p-breadcrumb>
				<br>
				<router-outlet></router-outlet>
			</div>
		</div>
	`,
	styles: ``
})
export class AdminComponent implements OnInit {
	sidebarVisible: boolean = false;

	public items: MenuItem[] = [];

	bread_items: MenuItem[] | undefined;

	home: MenuItem | undefined;

	constructor(private router: Router) {
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd)
		).subscribe(() => {
			// console.log(this.router.routerState.root);
		});
	}

	ngOnInit() {
		this.bread_items = [{ label: 'Accounts', routerLink: 'accounts' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
		this.home = { icon: 'fa-solid fa-house', routerLink: '/' };

		this.items = [
			{
				label: 'Accountant',
				items: [
					{
						label: 'Home',
						icon: 'fa-solid fa-house',
						routerLink: '/admin'
					},
				]
			},
			{
				label: 'Users',
				items: [
					{
						label: 'View',
						icon: 'fa-solid fa-list',
						routerLink: './users'
					},
					{
						label: 'Create',
						icon: 'fa-solid fa-plus',
						routerLink: './users/create'
					}
				]
			},
			{
				label: 'Currencies',
				items: [
					{
						label: 'View',
						icon: 'fa-solid fa-list',
						routerLink: './currencies'
					},
					{
						label: 'Create',
						icon: 'fa-solid fa-plus',
						routerLink: './currencies/create'
					},
				]
			}
		];
	}
}

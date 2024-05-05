import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { LayoutService } from "./service/app.layout.service";

import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';

@Component({
	selector: 'app-topbar',
	standalone: true,
	templateUrl: './app.topbar.component.html',
	imports: [
		CommonModule,
		RouterLink,

		ButtonModule,
		SplitButtonModule,
		OverlayPanelModule,
	]
})
export class AppTopBarComponent {

	items!: MenuItem[];

	@ViewChild('menubutton') menuButton!: ElementRef;

	@ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

	@ViewChild('topbarmenu') menu!: ElementRef;

	constructor(public layoutService: LayoutService) {}
}

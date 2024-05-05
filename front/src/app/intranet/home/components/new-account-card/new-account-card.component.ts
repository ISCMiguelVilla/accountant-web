import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { AmountComponent } from '../../../../core/shared/components/amount/amount.component';

@Component({
	selector: 'app-new-account-card',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,

		ButtonModule,
		CardModule,
		TagModule,

		AmountComponent,
	],
	templateUrl: './new-account-card.component.html',
	styles: ``
})
export class NewAccountCardComponent {

	@Output()
	public onCreate: EventEmitter<void>;

	constructor() {
		this.onCreate = new EventEmitter<void>();
	}

	public onCreateClick(): void {
		this.onCreate.emit();
	}
}

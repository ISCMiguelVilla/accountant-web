import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { AccountCardComponent } from '../../../../core/shared/components/account-card/account-card.component';

import { Account } from '../../../../core/models/interfaces/account.type';

@Component({
	selector: 'app-transactions-summary',
	standalone: true,
	imports: [
		DialogModule,
		ButtonModule,

		AccountCardComponent,
	],
	templateUrl: './transactions-summary.component.html',
	styles: ``
})
export class TransactionsSummaryComponent {

	@Input()
	public visible: boolean = false;

	@Input()
	public accounts: Array<Account> = [];

	@Output()
	public onCancel: EventEmitter<void>;

	@Output()
	public onSave: EventEmitter<void>;


	constructor() {
		this.onCancel = new EventEmitter<void>();
		this.onSave = new EventEmitter<void>();
	}

	public onCancelClick(): void {
		this.onCancel.emit();
	}

	public onSaveClick(): void {
		this.onSave.emit();
	}

}

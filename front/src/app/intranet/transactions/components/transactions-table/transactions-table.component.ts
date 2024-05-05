import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { TransactionTypeIconPipe } from '../../../../core/pipes/transaction-type-icon.pipe';

import { Transaction } from '../../../../core/models/interfaces/transaction.type';

@Component({
	selector: 'app-transactions-table',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,

		TransactionTypeIconPipe,

		ButtonModule,
		RippleModule,
		TableModule,
		TagModule,
	],
	templateUrl: './transactions-table.component.html',
	styles: ``
})
export class TransactionsTableComponent {

	@Input()
	public transactions: Array<Transaction> = [];

	@Input()
	public showView: boolean = false;

	@Input()
	public showApply: boolean = false;

	@Input()
	public showEdit: boolean = false;

	@Input()
	public showDelete: boolean = false;

	@Output()
	public onViewEmitter: EventEmitter<Transaction>;

	@Output()
	public onApplyEmitter: EventEmitter<Transaction>;

	@Output()
	public onEditEmitter: EventEmitter<Transaction>;

	@Output()
	public onDeleteEmitter: EventEmitter<Transaction>;

	constructor() {
		this.onViewEmitter = new EventEmitter<Transaction>();
		this.onApplyEmitter = new EventEmitter<Transaction>();
		this.onEditEmitter = new EventEmitter<Transaction>();
		this.onDeleteEmitter = new EventEmitter<Transaction>();
	}

	public getAppliedSeverity(applied: boolean): string {
		return applied ? 'success' : 'warning';
	}

	public onViewClick(transaction: Transaction): void {
		this.onViewEmitter.emit(transaction);
	}

	public onApplyClick(transaction: Transaction): void {
		this.onApplyEmitter.emit(transaction);
	}

	public onEditClick(transaction: Transaction): void {
		this.onEditEmitter.emit(transaction);
	}

	public onDeleteClick(transaction: Transaction): void {
		this.onDeleteEmitter.emit(transaction);
	}
}

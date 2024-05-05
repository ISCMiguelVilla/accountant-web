import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { TransactionsService } from '../../../../core/services/transactions.service';

import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';

import { Transaction } from '../../../../core/models/interfaces/transaction.type';

@Component({
	standalone: true,
	imports: [ RouterLink, ButtonModule, CardModule, DividerModule, TransactionsTableComponent ],
	templateUrl: './main.component.html',
	styles: ``
})
export class MainComponent {

	public transactions: Array<Transaction> = [];

	constructor(
		private _router: Router,

		private _transactionsService: TransactionsService,
	) {
	}

	ngOnInit(): void {
		this._list();
	}

	private _list(): void {
		this._transactionsService.list().subscribe({
			next: (transactions: Array<Transaction>) => this._transactionsListNext(transactions),
			error: (error) => console.error(error),
		});
	}

	private _transactionsListNext(transactions: Array<Transaction>): void {
		this.transactions = transactions;
	}

	public onApply(transaction: Transaction): void {
		this._transactionsService.apply(transaction.id)
				.subscribe({
					next: (transaction: Transaction) => this._transactionsApplyNext(transaction),
					error: (error) => console.error(error),
				});
	}

	public _transactionsApplyNext(transaction: Transaction): void {
		console.log('applied:', transaction);
		this._list();
	}
}

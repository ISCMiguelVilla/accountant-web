import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { ScheduleTransactionsService } from '../../../../core/services/schedule-transactions.service';

import { ScheduleTransactionsTableComponent } from '../../components/schedule-transactions-table/schedule-transactions-table.component';

import { ScheduleTransaction } from '../../../../core/models/interfaces/schedule-transaction.type';
import { EnumStatus } from '../../../../core/models/enums/enum-status';

@Component({
	standalone: true,
	imports: [
		RouterLink,

		ButtonModule,
		CardModule,
		DividerModule,

		ScheduleTransactionsTableComponent,
	],
	templateUrl: './main.component.html',
	styles: ``
})
export class MainComponent {

	public scheduleTransactions: Array<ScheduleTransaction> = [];

	constructor(
		private _router: Router,

		private _scheduleTransactionsService: ScheduleTransactionsService,
	) {
	}

	ngOnInit(): void {
		this._findAll();
	}

	private _findAll(): void {
		this._scheduleTransactionsService.findAll().subscribe({
			next: (scheduleTransactions: Array<ScheduleTransaction>) => this._findAllNext(scheduleTransactions),
			error: (error) => {
				console.error('ERROR:', error);
			}
		});
	}

	private _findAllNext(scheduleTransactions: Array<ScheduleTransaction>): void {
		this.scheduleTransactions = scheduleTransactions;
	}

	public onEdit(scheduleTransaction: ScheduleTransaction) {
		this._router.navigate(['intranet/schedule-transactions', scheduleTransaction.id, 'edit']);
	}

	public onUpdateStatus(scheduleTransaction: ScheduleTransaction) {
		const status = EnumStatus.ACTIVE != scheduleTransaction.status ? EnumStatus.ACTIVE : EnumStatus.DISABLED;
		this._scheduleTransactionsService.updateStatus(scheduleTransaction.id, status)
				.subscribe({
					next: (_): void => this._updateStatusNext(),
					error: (error): void => console.error(error),
				});
	}

	private _updateStatusNext(): void {
		this._findAll();
	}

	public onNextExecution(scheduleTransaction: ScheduleTransaction) {
		this._scheduleTransactionsService.nextExecution(scheduleTransaction.id, null)
				.subscribe({
					next: (_): void => this._nextExecutionNext(),
					error: (error): void => console.error(error),
				});
	}

	private _nextExecutionNext(): void {
		this._findAll();
	}
}

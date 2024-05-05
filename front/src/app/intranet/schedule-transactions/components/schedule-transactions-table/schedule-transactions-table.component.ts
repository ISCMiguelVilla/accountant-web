import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { TransactionTypeIconPipe } from '../../../../core/pipes/transaction-type-icon.pipe';

import { ScheduleTransaction } from '../../../../core/models/interfaces/schedule-transaction.type';
import { EnumStatus } from '../../../../core/models/enums/enum-status';

@Component({
	selector: 'app-schedule-transactions-table',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,

		TransactionTypeIconPipe,

		ButtonModule,
		TableModule,
		TagModule,
	],
	templateUrl: './schedule-transactions-table.component.html',
	styles: ``
})
export class ScheduleTransactionsTableComponent {
	private static readonly UPDATE_STATUS_PROPERTIES ={
		[EnumStatus.ACTIVE]: {
			text: 'Disable',
			icon: 'fa-solid fa-x',
			severity: 'danger',
		},
		[EnumStatus.DISABLED]: {
			text: 'Active',
			icon: 'fa-solid fa-check',
			severity: 'success',
		}
	};

	private static readonly STATUS_SEVERITY_LIST ={
		[EnumStatus.ACTIVE]:	'success',
		[EnumStatus.DISABLED]:	'warning',
		[EnumStatus.DELETED]:	'danger',
	};

	@Input()
	public scheduleTransactions: Array<ScheduleTransaction> = [];

	@Output()
	public onEditEmitter: EventEmitter<ScheduleTransaction>;

	@Output()
	public onUpdateStatusEmitter: EventEmitter<ScheduleTransaction>;

	@Output()
	public onNextExecutionEmitter: EventEmitter<ScheduleTransaction>;

	constructor() {
		this.onEditEmitter = new EventEmitter<ScheduleTransaction>();
		this.onUpdateStatusEmitter = new EventEmitter<ScheduleTransaction>();
		this.onNextExecutionEmitter = new EventEmitter<ScheduleTransaction>();
	}

	public updateStatusSeverity(status: EnumStatus): any {
		return ScheduleTransactionsTableComponent.UPDATE_STATUS_PROPERTIES[status];
	}

	public onEditClick(scheduleTransaction: ScheduleTransaction): void {
		this.onEditEmitter.emit(scheduleTransaction);
	}

	public onUpdateStatusClick(scheduleTransaction: ScheduleTransaction): void {
		this.onUpdateStatusEmitter.emit(scheduleTransaction);
	}

	public onNextExecutionClick(scheduleTransaction: ScheduleTransaction): void {
		this.onNextExecutionEmitter.emit(scheduleTransaction);
	}

	public getStatusSeverity(status: EnumStatus): string {
		return ScheduleTransactionsTableComponent.STATUS_SEVERITY_LIST[status];
	}
}

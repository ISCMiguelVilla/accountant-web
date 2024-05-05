import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { AccountsService } from '../../../../core/services/accounts.service';
import { ScheduleTransactionsService } from '../../../../core/services/schedule-transactions.service';

import { ScheduleTransactionFormComponent } from '../../components/schedule-transaction-form/schedule-transaction-form.component';

import { Account } from '../../../../core/models/interfaces/account.type';
import { CronExpressionView, ScheduleTransaction } from '../../../../core/models/interfaces/schedule-transaction.type';
import { EnumCroExpressionStatus } from '../../../../core/models/enums/enum-cron-expression-status';

@Component({
	standalone: true,
	imports: [
		CommonModule,

		ButtonModule,
		CardModule,
		InputTextModule,
		ToastModule,

		ScheduleTransactionFormComponent,
	],
	providers: [ MessageService ],
	templateUrl: './maintenance.component.html',
	styles: ``
})
export class MaintenanceComponent {

	public modalMessageVisible: boolean = false;

	private _id: number;
	private _creating: boolean = true;

	private _accounts: Array<Account> = [];

	@ViewChild('transactionForm')
	public scheduleTransactionForm: ScheduleTransactionFormComponent;

	public get title(): string {
		return this._creating ? 'New schedule transaction' : 'Edit schedule transaction';
	}

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _messageService: MessageService,

		private _accountsService: AccountsService,
		private _scheduleTransactionsService: ScheduleTransactionsService,
	) {
		this._accountsService.usableAccounts().pipe(
			tap((accounts) => this._usableAccountsNext(accounts)),
		).subscribe({
			next: (_) => {
				if( !this._router.url.includes('edit') )
					return;
				this._getEditableTransaction();
			},
			error: (error: any) => {
				console.error(error);
			}
		});
	}

	private _usableAccountsNext(accounts: Array<Account>): void {
		this._accounts = accounts;
		this.scheduleTransactionForm.setAccounts(this._accounts);
	}

	private _getEditableTransaction() {
		this._activatedRoute
			.params
			.pipe(switchMap(({ id }) => {
				this._id = id;
				return this._scheduleTransactionsService.findById(id);
			}))
			.subscribe({
				next: (scheduleTransaction: ScheduleTransaction): void => this._findByIdNext(scheduleTransaction),
				error: (error) => {
					console.error(error);
					this._router.navigateByUrl('/page-not-found');
				}
			});
	}

	private _findByIdNext(scheduleTransaction: ScheduleTransaction): void {
		this._creating = false;
		this.scheduleTransactionForm.edit(scheduleTransaction);
	}

	public onSave(scheduleTransaction: ScheduleTransaction): void {
		if( this._creating ) {
			this._create(scheduleTransaction);
		} else {
			this._update(scheduleTransaction);
		}
	}

	private _create(scheduleTransaction: ScheduleTransaction) {
		this._scheduleTransactionsService.create(scheduleTransaction)
				.subscribe({
					next: (scheduleTransaction: ScheduleTransaction): void => this._createNext(scheduleTransaction),
					error: (error): void => console.error(error),
				});
	}

	private _createNext(scheduleTransaction: ScheduleTransaction) {
		this._id = scheduleTransaction.id;
		this._creating = false;

		this.scheduleTransactionForm.edit(scheduleTransaction);

		this._messageService.add({
			severity:	'success',
			summary:	'Created',
			detail:		`${scheduleTransaction.type} created`,
		});
	}

	private _update(scheduleTransaction: ScheduleTransaction) {
		this._scheduleTransactionsService.update(this._id, scheduleTransaction)
				.subscribe({
					next: (scheduleTransaction: ScheduleTransaction): void => this._updateNext(scheduleTransaction),
					error: (error): void => console.error(error),
				});
	}

	private _updateNext(scheduleTransaction: ScheduleTransaction) {
		this.scheduleTransactionForm.edit(scheduleTransaction);

		this._messageService.add({
			severity:	'success',
			summary:	'Updated',
			detail:		`${scheduleTransaction.type} updated`,
		});
	}

	public onCancel(): void {
		this._router.navigateByUrl('/intranet/schedule-transactions');
	}

	public onCheck(cronExpression: string): void {
		this._scheduleTransactionsService.check(cronExpression)
				.subscribe({
					next: (cronExpressionView: CronExpressionView): void => this._onCheckNext(cronExpressionView),
					error: (error): void => this._onCheckError(error),
				});
	}

	public _onCheckNext(cronExpressionView: CronExpressionView): void {
		this.scheduleTransactionForm.cronExpressionStatus = EnumCroExpressionStatus.VALID;

		this._messageService.add({
			severity:	'success',
			summary:	'Cron expression valid',
			detail:		`Next execution: ${cronExpressionView.nextExecution}`,
		});
	}

	public _onCheckError(error): void {
		this.scheduleTransactionForm.cronExpressionStatus = EnumCroExpressionStatus.INVALID;

		this._messageService.add({
			severity:	'error',
			summary:	'Cron expression invalid',
			detail:		`Please check the expression`,
		});
	}
}

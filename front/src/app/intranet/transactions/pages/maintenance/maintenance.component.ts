import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';

import { AccountsService } from '../../../../core/services/accounts.service';
import { TransactionsService } from '../../../../core/services/transactions.service';
import { TransactionsLocalService } from '../../../../core/services/transactions.local.service';
import { ScheduleTransactionsService } from '../../../../core/services/schedule-transactions.service';

import { TransactionFormComponent } from '../../components/transaction-form/transaction-form.component';
import { TransactionsSummaryComponent } from '../../components/transactions-summary/transactions-summary.component';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';

import { Account } from '../../../../core/models/interfaces/account.type';
import { Transaction } from '../../../../core/models/interfaces/transaction.type';

import { ScheduleTransaction } from '../../../../core/models/interfaces/schedule-transaction.type';
import { ScheduleTransactionsTableComponent } from '../../../schedule-transactions/components/schedule-transactions-table/schedule-transactions-table.component';

import { EnumAccountType } from '../../../../core/models/enums/enum-account-type';
import { EnumActionType } from '../../../../core/models/enums/enum-action-type';
import { EnumStatus } from '../../../../core/models/enums/enum-status';
import { EnumTransactionStatus } from '../../../../core/models/interfaces/transaction-status.type';

@Component({
	standalone: true,
	imports: [
		CommonModule,

		ButtonModule,
		CardModule,
		ConfirmDialogModule,
		DialogModule,
		DividerModule,
		ToastModule,

		ScheduleTransactionsTableComponent,
		TransactionFormComponent,
		TransactionsTableComponent,
		TransactionsSummaryComponent,
	],
	providers: [ ConfirmationService, MessageService ],
	templateUrl: './maintenance.component.html',
	styles: ``
})
export class MaintenanceComponent {

	private static readonly UNUSABLE_TRANSACTION_TYPES = [ EnumAccountType.SUPPLIER, EnumAccountType.CONSUMER ];

	private static readonly TOAST_CONFIG = {
		[EnumTransactionStatus.SUCCESS]:				{ color: 'success',	summary: 'Success',					},
		[EnumTransactionStatus.INSUFFICIENT_FOUNDS]:	{ color: 'info',	summary: 'Insufficient founds',		},
		[EnumTransactionStatus.SENSELESS]:				{ color: 'warn',	summary: 'Senseless',				},
		[EnumTransactionStatus.ERROR]:					{ color: 'error',	summary: 'Error',					},
	}

	private static readonly TRANSACTIONS_DESCENDING = (objA: Transaction, objB: Transaction) => {
		return new Date(objB.savedAt).getTime() - new Date(objA.savedAt).getTime();
	};

	public _actionType: EnumActionType = EnumActionType.CREATING;

	@ViewChild('transactionForm')
	public transactionForm: TransactionFormComponent;

	public get thereAreTransactions(): boolean {
		return this.transactions.length > 0;
	}

	private _creating: boolean = true;

	public modalMessageVisible: boolean = false;

	public accountsSummaryVisible: boolean = false;
	public usedAccounts: Array<Account> = [];

	private _accounts: Array<Account> = [];
	private get _pristineAccounts(): Array<Account> {
		return JSON.parse(JSON.stringify(this._accounts));
	}

	private _accountsUpdated: Array<Account> = [];

	public transactions: Array<Transaction> = [];
	private get _pristineTransactions(): Array<Transaction> {
		return JSON.parse(JSON.stringify(this.transactions));
	}

	public _scheduleTransactions: Array<Transaction> = [];
	public scheduleTransactions: Array<Transaction> = [];

	constructor(
		private _router: Router,
		private _confirmationService: ConfirmationService,
		private _messageService: MessageService,

		private _accountsService: AccountsService,
		private _transactionsService: TransactionsService,
		private _transactionsLocalService: TransactionsLocalService,
		private _scheduleTransactionsService: ScheduleTransactionsService,
	) {
		this._accountsService.usableAccounts().pipe(
			tap((accounts) => this._accountsUsableAccountsNext(accounts)),
			switchMap((_) => this._scheduleTransactionsService.applicable())
		).subscribe({
			next: (scheduleTransactions: Array<ScheduleTransaction>): void => {
				this._scheduleTransactionsApplicableNext(scheduleTransactions);
			},
			error: (error: any) => {
				console.error(error);
			}
		});
	}

	private _accountsUsableAccountsNext(accounts: Array<Account>): void {
		this._accounts = accounts;
		this.transactionForm.setAccounts(this._pristineAccounts);

		this._loadTransactions();
	}
	
	private _scheduleTransactionsApplicableNext(scheduleTransactions: Array<ScheduleTransaction>): void {
		this._scheduleTransactions = scheduleTransactions;
		this._updateScheduleTransactions();
	}

	private _updateScheduleTransactions(): void {
		const appliedList = this.transactions.filter(transaction => transaction.scheduleTransactionId != null)
				.map(transaction => transaction.scheduleTransactionId);
		this.scheduleTransactions = JSON.parse(JSON.stringify(this._scheduleTransactions)).filter(transaction => !appliedList.includes(transaction.id));
	}

	public onDelete(transaction: Transaction): void {
		this._apply('delete', transaction);
		this._updateScheduleTransactions();
		if( this.transactions.length <= 0 ) {
			this._transactionsLocalService.remove();
		}
	}

	private _apply(type: string, transaction: Transaction): void {
		this._messageService.clear();

		const accounts = this._pristineAccounts;
		const transactions = this._pristineTransactions;

		try {
			let result = this._transactionsLocalService[type](accounts, transactions, transaction);
			const { accounts: accountsUpdated, transactions: transactionsUpdated } = result;
			this._accountsUpdated = accountsUpdated;
			this.transactions = this.sort(transactionsUpdated);
			this._transactionsLocalService.save(this.transactions);
			this._updateScheduleTransactions();

			this._creating = true;
			this._actionType = EnumActionType.CREATING;
			this.transactionForm.setAccounts(accountsUpdated);
			this.transactionForm.resetForm();
		} catch(error) {
			console.error(JSON.stringify(error));

			const toastConfig = MaintenanceComponent.TOAST_CONFIG[error.status];

			this._messageService.add({
				severity:	toastConfig.color,
				summary:	toastConfig.summary,
				detail:		error.detail,
				sticky:		true
			});
		}
	}

	private _loadTransactions(): void {
		const localTransactions = this._transactionsLocalService.findAll();
		if( !localTransactions ) {
			return;
		}

		this.transactions = localTransactions;

		this._messageService.clear();

		const accounts = this._pristineAccounts;
		const transactions = this._pristineTransactions;

		try {
			let result = this._transactionsLocalService.applyTransactions(accounts, transactions);
			const { accounts: accountsUpdated, transactions: transactionsUpdated } = result;
			this._accountsUpdated = accountsUpdated;
			this.transactions = this.sort(transactionsUpdated);
			this._transactionsLocalService.save(this.transactions);

			this._creating = true;
			this._actionType = EnumActionType.CREATING;
			this.transactionForm.setAccounts(accountsUpdated);
			this.transactionForm.resetForm();
		} catch(error) {
			console.error(JSON.stringify(error));

			const toastConfig = MaintenanceComponent.TOAST_CONFIG[error.status];

			this._messageService.add({
				severity:	toastConfig.color,
				summary:	toastConfig.summary,
				detail:		error.detail,
				sticky:		true
			});
		}
	}

	public sort(transactions: Array<Transaction>): Array<Transaction> {
		transactions.sort(MaintenanceComponent.TRANSACTIONS_DESCENDING)
				.forEach((transaction, index) => transaction.id = index + 1);

		return transactions;
	}

	public onCancelClick(actionType: EnumActionType) {
		this._creating = true;

		this._messageService.clear();
		this.transactionForm.resetForm();

		if( EnumActionType.CREATING == this._actionType ) {
			this._router.navigateByUrl('/intranet/transactions');
		}

		this._actionType = EnumActionType.CREATING;
	}

	public onClearClick() {
		if( this.transactions.length <= 0 ) {
			this._messageService.clear();
			this._messageService.add({
				severity:	'success',
				summary:	'There are no transactions',
				detail:		'Add some transaction',
			});
			return;
		}

		this._confirmationService.confirm({
			header: 'Delete transactions?',
			message: 'Please confirm to proceed moving forward.',
			rejectLabel: 'Yes',
			rejectIcon: 'fa-solid fa-trash-can mr-2',
			rejectButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
			reject: () => {
				this._deleteTransactions();
			},
			acceptLabel: 'No',
			acceptIcon: 'fa-solid fa-list mr-2',
			acceptButtonStyleClass: 'p-button-success p-button-sm',
		});
	}

	private _deleteTransactions(): void {
		this._transactionsLocalService.remove();

		this.transactions = [];
		this.transactionForm.setAccounts(this._pristineAccounts);

		this._updateScheduleTransactions();
		this.transactionForm.resetForm();

		this._messageService.add({ severity: 'warn', summary: 'Transactions deleted', detail: 'Transactions have been deleted' });
	}

	public onCheckClick() {
		if( this.transactions.length <= 0 ) {
			this._messageService.clear();
			this._messageService.add({
				severity:	'info',
				summary:	'There are no transactions',
				detail:		'Add some transaction',
			});
			return;
		}

		let usedAccountIds = this.transactions.flatMap(transition => [transition.origin, transition.destination])
			.filter(account => account != null && !MaintenanceComponent.UNUSABLE_TRANSACTION_TYPES.includes(account.type))
			.map(account => account.id);

		this.usedAccounts = this._accountsUpdated.filter(account => usedAccountIds.includes(account.id));

		this.accountsSummaryVisible = true;
	}

	public onApply(transaction: Transaction) {
		if( this._creating ) {
			this._apply('add', transaction);
		} else {
			this._apply('edit', transaction);
		}
	}

	public onEdit(transaction: Transaction): void {
		this._creating = false;
		this._actionType = EnumActionType.EDITING;
		this.transactionForm.edit(transaction);
	}

	public onSave(): void {
		this.accountsSummaryVisible = false;
		this._transactionsService.createBulk(this.transactions)
				.subscribe({
					next: (transactions: Array<Transaction>) => this.transactionsCreateBulkNext(transactions),
					error: (error) => {
						console.error(error);
					}
				});
	}

	public transactionsCreateBulkNext(transactions: Array<Transaction>) {
		this._transactionsLocalService.remove();
		this.modalMessageVisible = true;
	}

	public onDoneClick(): void {
		this._deleteTransactions();

		this.modalMessageVisible = false;
		this._router.navigate(['/intranet/transactions']);
	}

	public onApplyScheduleTransaction(scheduleTransaction: ScheduleTransaction) {
		this._actionType = EnumActionType.APPLYING_SCHEDULED;
		const transaction = this._mapToTransactions(scheduleTransaction);
		this.transactionForm.schedule(transaction);
	}

	private _mapToTransactions(scheduleTransaction: ScheduleTransaction): Transaction {
		const now = new Date();
		return {
			uuid:					null,
			id:						null,
			scheduleTransactionId:	scheduleTransaction.id,
			type:					scheduleTransaction.type,
			origin:					scheduleTransaction.origin,
			destination:			scheduleTransaction.destination,
			savedAt:				now,
			appliedAt:				now,
			amount:					scheduleTransaction.amount,
			interest:				scheduleTransaction.interest,
			description:			scheduleTransaction.description,
			applied:				true,
			status:					EnumStatus.ACTIVE,
		};
	}
}

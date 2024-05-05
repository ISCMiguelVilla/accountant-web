import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';

import { TransactionsLocalService } from '../../../../core/services/transactions.local.service';

import { AccountCardComponent } from '../../../../core/shared/components/account-card/account-card.component';

import { Account } from '../../../../core/models/interfaces/account.type';
import { ScheduleTransaction } from '../../../../core/models/interfaces/schedule-transaction.type';

import { EnumCroExpressionStatus } from '../../../../core/models/enums/enum-cron-expression-status';
import { EnumStatus } from '../../../../core/models/enums/enum-status';
import { EnumTransactionType } from '../../../../core/models/enums/enum-transaction-type';

@Component({
	selector: 'app-schedule-transaction-form',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,

		ButtonModule,
		CalendarModule,
		CheckboxModule,
		ColorPickerModule,
		DropdownModule,
		InputGroupModule,
		InputGroupAddonModule,
		InputNumberModule,
		InputTextModule,
		ListboxModule,
		RadioButtonModule,
		TagModule,

		AccountCardComponent,
	],
	templateUrl: './schedule-transaction-form.component.html',
	styles: ``
})
export class ScheduleTransactionFormComponent {

	public readonly status = EnumStatus;
	public readonly types = EnumTransactionType;

	public readonly statusList: Array<EnumStatus> = [ EnumStatus.ACTIVE, EnumStatus.DISABLED ];

	@Output()
	public onSaveEmitter: EventEmitter<ScheduleTransaction>;

	@Output()
	public onCancelEmitter: EventEmitter<void>;

	@Output()
	public onCheckEmitter: EventEmitter<string>;

	public accounts: Account[];

	public origins: Array<Account> = [];
	public _pristineOrigins: Array<Account> = [];

	public destinations: Array<Account> = [];
	public _pristineDestinations: Array<Account> = [];

	public transactionForm: FormGroup = this._createForm();

	private get _scheduleTransaction(): ScheduleTransaction {
		return this.transactionForm.getRawValue() as ScheduleTransaction;
	}

	private get _originId(): number {
		return this.transactionForm.get('origin').value?.id;
	}

	public get origin(): Account {
		return this.transactionForm.get('origin').value as Account;
	}

	private get _destinationId(): number {
		return this.transactionForm.get('destination').value?.id;
	}

	public get destination(): Account {
		return this.transactionForm.get('destination').value as Account;
	}

	private get _type(): EnumTransactionType {
		return this.transactionForm.get('type').value as EnumTransactionType;
	}

	public cronExpressionStatus: EnumCroExpressionStatus = EnumCroExpressionStatus.PENDING;

	private static readonly CRON_EXPRESSION_STATUS_LIST = {
		[EnumCroExpressionStatus.PENDING]: {
			color: 'p-button-warning',
			icon: 'fa-solid fa-question',
		},
		[EnumCroExpressionStatus.VALID]: {
			color: 'p-button-success',
			icon: 'fa-solid fa-check',
		},
		[EnumCroExpressionStatus.INVALID]: {
			color: 'p-button-danger',
			icon: 'fa-solid fa-triangle-exclamation',
		}
	};

	public get cronStatus(): any {
		return ScheduleTransactionFormComponent.CRON_EXPRESSION_STATUS_LIST[this.cronExpressionStatus];
	}

	public get cronExpression(): string {
		return this.transactionForm.get('cronExpression').value;
	}

	constructor(
		private _formBuilder: FormBuilder,

		private _transactionsLocalService: TransactionsLocalService,
	) {
		this.onSaveEmitter		= new EventEmitter<ScheduleTransaction>();
		this.onCancelEmitter	= new EventEmitter<void>();
		this.onCheckEmitter		= new EventEmitter<string>();
	}

	private _createForm(): FormGroup {
		return this._formBuilder.group({
			id:							[ null, ],

			type:						[ EnumTransactionType.INCOME, [ Validators.required ] ],

			origin:						[ null, [ Validators.required ] ],
			destination:				[ null, [ Validators.required ] ],

			amount:						[ 0.0, [ Validators.required, Validators.min(0.01) ] ],
			interest:					[ 0.0, [ Validators.min(0.00) ] ],

			description:				[ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ] ],

			lastExecution:				[{ value: null, disabled: true }],
			nextExecution:				[ null ],

			status:						[ EnumStatus.ACTIVE, [ Validators.required ] ],
			cronExpression:				[ null, [ Validators.required ] ],
		});
	}

	public setAccounts(accounts: Array<Account>): void {
		this.accounts = accounts;
		this._updateAccounts();
	}

	public onTypeChange() {
		this._updateValidations();

		this.resetOrigin();
		this.resetDestination();

		this._updateAccounts();
	}

	private resetOrigin() {
		this.resetAccounts('origin');
	}

	private resetDestination() {
		this.resetAccounts('destination');
	}

	private resetAccounts(account: string) {
		this.transactionForm.get(account).setValue(null);
		this.transactionForm.get(account).markAsPristine();
		this.transactionForm.get(account).updateValueAndValidity();
	}

	private _updateAccounts(): void {
		const { origins, destinations } = this._transactionsLocalService.getAccounts(this._type, this.accounts);
		this._pristineOrigins = origins;
		this._pristineDestinations = destinations;

		this._updateOrigins();
		this._updateDestinations();
	}

	private _updateOrigins() {
		this.origins = this._pristineOrigins.filter(account => this._destinationId ? this._destinationId != account.id : true );
	}

	private _updateDestinations() {
		this.destinations = this._pristineDestinations.filter(account => this._originId ? this._originId != account.id : true );
	}

	public onOriginsClick() {
		this._updateDestinations();
	}

	public onDestinationsClick() {
		this._updateOrigins();
	}

	private _updateValidations() {
		const destination = this.transactionForm.get('destination');

		const isDestinationAccountOptional = this._transactionsLocalService.isDestinationAccountOptional(this._type);
		if( isDestinationAccountOptional ) {
			destination.clearValidators();
		} else {
			destination.setValidators([ Validators.required ]);
		}

		destination.updateValueAndValidity();
	}

	public edit(scheduleTransaction: ScheduleTransaction): void {
		this.transactionForm.patchValue(scheduleTransaction);
		if( scheduleTransaction.lastExecution ) {
			this.transactionForm.get('lastExecution').setValue(new Date(scheduleTransaction.lastExecution));
		}
		this.transactionForm.get('nextExecution').setValue(new Date(scheduleTransaction.nextExecution));

		this._updateAccounts();

		this.cronExpressionStatus = EnumCroExpressionStatus.VALID;
	}

	public onSaveClick(): void {
		if( this.transactionForm.invalid ) {
			this.transactionForm.markAllAsTouched();
			return;
		}

		this.onSaveEmitter.emit(this._scheduleTransaction);
	}

	public onCancelClick(): void {
		this.onCancelEmitter.emit();
	}

	public onCheckClick(): void {
		this.onCheckEmitter.emit(this.cronExpression);
	}
}

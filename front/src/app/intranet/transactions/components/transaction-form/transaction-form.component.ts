import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { TagModule } from 'primeng/tag';

import { TransactionsLocalService } from '../../../../core/services/transactions.local.service';

import { TransactionTypeIconPipe } from '../../../../core/pipes/transaction-type-icon.pipe';

import { AccountCardComponent } from '../../../../core/shared/components/account-card/account-card.component';

import { Account } from '../../../../core/models/interfaces/account.type';
import { Transaction } from '../../../../core/models/interfaces/transaction.type';

import { EnumActionType } from '../../../../core/models/enums/enum-action-type';
import { EnumTransactionType } from '../../../../core/models/enums/enum-transaction-type';
import { EnumStatus } from '../../../../core/models/enums/enum-status';

@Component({
	selector: 'app-transaction-form',
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
		TagModule,

		TransactionTypeIconPipe,

		AccountCardComponent,
	],
	templateUrl: './transaction-form.component.html',
	styles: `
		.total-amount {
			color: blue;
			text-decoration: underline;
		}
	`
})
export class TransactionFormComponent implements OnInit {

	public readonly status = EnumStatus;
	public readonly types = EnumTransactionType;

	@Input()
	public enableClearButton: boolean;

	@Input()
	public enableSaveButton: boolean;

	@Output()
	public onCancelEmitter: EventEmitter<EnumActionType>;

	@Output()
	public onClearEmitter: EventEmitter<void>;

	@Output()
	public onCheckEmitter: EventEmitter<void>;

	@Output()
	public onAddEmitter: EventEmitter<Transaction>;

	public _actionType: EnumActionType = EnumActionType.CREATING;

	private _accounts: Account[];

	public origins: Array<Account> = [];
	private _pristineOrigins: Array<Account> = [];

	public destinations: Array<Account> = [];
	private _pristineDestinations: Array<Account> = [];

	private _creating: boolean = true;

	private static readonly CANCEL_BUTTON = {
		[EnumActionType.CREATING]:				{
			text:		'Cancel',
			icon:		'fa-solid fa-x',
			severity:	'warning',
		},
		[EnumActionType.EDITING]:				{
			text:		'Cancel editing',
			icon:		'fa-solid fa-x',
			severity:	'warning',
		},
		[EnumActionType.APPLYING_SCHEDULED]:	{
			text:		'Cancel scheduled',
			icon:		'fa-solid fa-x',
			severity:	'warning',
		},
	};

	public get cancelButton() {
		return TransactionFormComponent.CANCEL_BUTTON[this._actionType];
	}

	private static readonly CLEAR_BUTTON = {
		[EnumActionType.CREATING]:				{
			text:		'Add',
			icon:		'fa-solid fa-plus',
			severity:	'success',
		},
		[EnumActionType.EDITING]:				{
			text:		'Update',
			icon:		'fa-solid fa-check',
			severity:	'warning',
		},
		[EnumActionType.APPLYING_SCHEDULED]:	{
			text:		'Apply',
			icon:		'fa-solid fa-check',
			severity:	'success',
		},
	};

	public get clearButton() {
		return {
			text:		'Delete transactions',
			icon:		'fa-solid fa-trash-can',
			severity:	'danger',
		};
	}

	private static readonly APPLY_BUTTON = {
		[EnumActionType.CREATING]:				{
			text:		'Add',
			icon:		'fa-solid fa-plus',
			severity:	'success',
		},
		[EnumActionType.EDITING]:				{
			text:		'Update',
			icon:		'fa-solid fa-check',
			severity:	'warning',
		},
		[EnumActionType.APPLYING_SCHEDULED]:				{
			text:		'Apply',
			icon:		'fa-solid fa-check',
			severity:	'success',
		},
	};

	public get applyButton() {
		return TransactionFormComponent.APPLY_BUTTON[this._actionType];
	}

	public transactionForm: FormGroup;

	private get _transaction(): Transaction {
		return this.transactionForm.getRawValue() as Transaction;
	}

	public get origin(): Account {
		return this.transactionForm.get('origin').value as Account;
	}

	private get _originId(): number {
		return this.origin?.id;
	}

	public get destination(): Account {
		return this.transactionForm.get('destination').value as Account;
	}

	private get _destinationId(): number {
		return this.destination?.id;
	}

	public get type(): EnumTransactionType {
		return this.transactionForm.get('type').value as EnumTransactionType;
	}

	private get _appliedAt(): Date {
		return this.transactionForm.get('appliedAt').value as Date;
	}

	private get _applied(): boolean {
		return this.transactionForm.get('applied').value as boolean;
	}

	public get amount(): number {
		return this.transactionForm.get('amount').value as number;
	}

	public get originAmount(): number {
		return this.origin?.amount;
	}

	public get showDestination(): boolean {
		return this.type != EnumTransactionType.INTEREST
	}

	constructor(
		private _formBuilder: FormBuilder,

		private _transactionsLocalService: TransactionsLocalService,
	) {
		this.onCancelEmitter	= new EventEmitter<EnumActionType>();
		this.onClearEmitter		= new EventEmitter<void>();
		this.onCheckEmitter		= new EventEmitter<void>();
		this.onAddEmitter		= new EventEmitter<Transaction>();
	}

	public ngOnInit(): void {
		this.transactionForm = this._createForm();
		this._updateDescription();
	}

	public resetForm(): void {
		this._actionType = EnumActionType.CREATING;
		this.transactionForm = this._createForm();
		this.onTypeChange();
	}

	private _createForm(): FormGroup {
		const now = new Date();
		return this._formBuilder.group({
			uuid:						[ null, ],

			id:							[ null, ],
			scheduleTransactionId:		[ null, ],

			type:						[ EnumTransactionType.INCOME, [ Validators.required ] ],

			origin:						[ null, [ Validators.required ] ],
			destination:				[ null, [ Validators.required ] ],

			savedAt:					[ now, [ Validators.required ] ],
			appliedAt:					[ now, [ Validators.required ] ],

			amount:						[ 0.0, [ Validators.required, Validators.min(0.01) ] ],
			interest:					[ 0.0, [ Validators.min(0.00) ] ],

			description:				[ null, [ Validators.required, Validators.minLength(3), Validators.maxLength(255) ] ],

			applied:					[ true, ],
			status:						[ EnumStatus.ACTIVE, [ Validators.required ] ],
		});
	}

	public setAccounts(accounts: Array<Account>): void {
		this._accounts = accounts;
		this._updateAccounts();
	}

	public onTypeChange() {
		this._updateValidations();

		this._resetAccounts('origin');
		this._resetAccounts('destination');

		this._updateAccounts();
		this._updateDescription();
	}

	private _resetAccounts(account: string) {
		this.transactionForm.get(account).setValue(null);
		this.transactionForm.get(account).markAsPristine();
		this.transactionForm.get(account).updateValueAndValidity();
	}

	private _updateAccounts(): void {
		const { origins, destinations } = this._transactionsLocalService.getAccounts(this.type, this._accounts);
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

	public onOriginsChange() {
		this._updateDestinations();
		this._updateDescription();
	}

	public onDestinationsChange() {
		this._updateOrigins();
		this._updateDescription();
	}

	private _updateValidations() {
		const destination = this.transactionForm.get('destination');

		const isDestinationAccountOptional = this._transactionsLocalService.isDestinationAccountOptional(this.type);
		if( isDestinationAccountOptional ) {
			destination.clearValidators();
		} else {
			destination.setValidators([ Validators.required ]);
		}

		destination.updateValueAndValidity();
	}

	public onSavedAtSelect(): void {
		const appliedAt = this.transactionForm.get('appliedAt');
		if( appliedAt.pristine ) {
			appliedAt.setValue(this.transactionForm.get('savedAt').value);
		}
	}

	public onAppliedAtSelect(): void {
		this._updateApplied();

		const appliedAt = this.transactionForm.get('appliedAt');
		appliedAt.setValidators([ Validators.required ]);
		appliedAt.updateValueAndValidity();
	}

	public onAppliedAtClear(): void {
		this._updateApplied();

		const appliedAt = this.transactionForm.get('appliedAt');
		appliedAt.clearValidators();
		appliedAt.updateValueAndValidity();
	}

	private _updateApplied() {
		const applied = this.transactionForm.get('applied');

		if( this._appliedAt ) {
			applied.setValue(true);
		} else {
			applied.setValue(false);
		}

		applied.updateValueAndValidity();
	}

	public onMatchAppliedAt(): void {
		const appliedAt = this.transactionForm.get('appliedAt');
		appliedAt.setValue(this.transactionForm.get('savedAt').value);
		appliedAt.markAsPristine();
	}

	public onAppliedChange(): void {
		const appliedAt = this.transactionForm.get('appliedAt');

		if( this._applied ) {
			appliedAt.setValue(new Date());
			appliedAt.setValidators([ Validators.required ]);
		} else {
			appliedAt.setValue(null);
			appliedAt.clearValidators();
		}

		appliedAt.updateValueAndValidity();
	}

	public edit(transaction: Transaction): void {
		this._creating = false;
		this._actionType = EnumActionType.EDITING;
		this._setTransaction(transaction);
	}

	public schedule(transaction: Transaction): void {
		this._actionType = EnumActionType.APPLYING_SCHEDULED;

		this.disableType();
		this.disableOrigin();
		this.disableDestination();

		this._setTransaction(transaction);
	}

	private disableType(): void {
		const type = this.transactionForm.get('type');
		type.disable();
		type.updateValueAndValidity();
	}

	private disableOrigin(): void {
		const origin = this.transactionForm.get('origin');
		origin.disable();
		origin.updateValueAndValidity();
	}

	private disableDestination(): void {
		const destination = this.transactionForm.get('destination');
		destination.disable();
		destination.updateValueAndValidity();
	}

	private _setTransaction(transaction: Transaction): void {
		this.transactionForm.patchValue(transaction);
		this.transactionForm.get('savedAt').setValue(new Date(transaction.savedAt));
		this.transactionForm.get('appliedAt').setValue(new Date(transaction.appliedAt));

		this._updateAccounts();
	}

	public onCheckClick(): void {
		this.onCheckEmitter.emit();
	}

	public onAddClick(): void {
		if( this.transactionForm.invalid ) {
			this.transactionForm.markAllAsTouched();
			return;
		}
		this._creating = true;
		this.onAddEmitter.emit(this._transaction);
	}

	public onCancelClick(): void {
		this._creating = true;
		this.onCancelEmitter.emit(this._actionType);
	}

	public onClearClick(): void {
		this._creating = true;
		this.onClearEmitter.emit();
	}

	private _updateDescription(): void {
		if( !(this._creating && this.transactionForm.get('description').pristine) ) {
			return;
		}

		const description = this.type
				+ (this.origin?.name ? ` from ${this.origin.name}` : '')
				+ (this.destination?.name ? ` to ${this.destination.name}` : '');

		this.transactionForm.get('description').setValue(description);
	}

	public addTotalAmount() {
		this.transactionForm.get('amount').setValue(this.originAmount);
	}
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

import { AccountTypeIconPipe } from '../../../../core/pipes/account-type-icon.pipe';

import { AccountCardComponent } from '../../../../core/shared/components/account-card/account-card.component';

import { Account } from '../../../../core/models/interfaces/account.type';
import { Currency } from '../../../../core/models/interfaces/currency.type';

import { EnumAccountType } from '../../../../core/models/enums/enum-account-type';
import { EnumStatus } from '../../../../core/models/enums/enum-status';

@Component({
	selector: 'app-account-form',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		CommonModule,

		AutoFocusModule,
		ButtonModule,
		CardModule,
		CheckboxModule,
		ColorPickerModule,
		DropdownModule,
		InputGroupModule,
		InputGroupAddonModule,
		InputNumberModule,
		InputTextModule,
		RadioButtonModule,

		AccountTypeIconPipe,

		AccountCardComponent,
	],
	templateUrl: './account-form.component.html',
	styles: ``
})
export class AccountFormComponent {

	private static readonly DEFAULT_COLOR = '#3B82F6';

	public readonly statusList: Array<EnumStatus> = [ EnumStatus.ACTIVE, EnumStatus.DISABLED ];

	private static readonly SUB_ACCOUNT_TYPES = {
		[EnumAccountType.GROUP]:		[EnumAccountType.GROUP, EnumAccountType.SUPPLIER, EnumAccountType.STORAGE, EnumAccountType.CONSUMER, EnumAccountType.BUSINESS, EnumAccountType.INVESTMENT, EnumAccountType.CREDITOR, EnumAccountType.DEBTOR],
		[EnumAccountType.SUPPLIER]:		[EnumAccountType.SUPPLIER],
		[EnumAccountType.STORAGE]:		[EnumAccountType.STORAGE, EnumAccountType.INVESTMENT],
		[EnumAccountType.CONSUMER]:		[EnumAccountType.CONSUMER],
		[EnumAccountType.BUSINESS]:		[EnumAccountType.STORAGE, EnumAccountType.INVESTMENT],
		[EnumAccountType.INVESTMENT]:	[EnumAccountType.STORAGE, EnumAccountType.INVESTMENT],
		[EnumAccountType.CREDITOR]:		[EnumAccountType.CREDITOR],
		[EnumAccountType.DEBTOR]:		[EnumAccountType.DEBTOR],
	}

	public accounts: Account[] | undefined;

	public currencies: Currency[] | undefined;

	@Output()
	public onSaveEmitter: EventEmitter<Account>;

	@Output()
	public onCancelEmitter: EventEmitter<Account>;

	private _creating: boolean = true;

	private _editAccount: Account = null;

	public accountForm: FormGroup;

	public get account(): Account {
		return this.accountForm.getRawValue() as Account;
	}

	public get id(): number {
		return this.accountForm.get('id').value as number;
	}

	public get parent(): Account {
		return this.accountForm.get('parent').value as Account;
	}

	public get type(): EnumAccountType {
		return this.accountForm.get('type')?.value as EnumAccountType;
	}

	public get icon(): string {
		return this.accountForm.get('icon')?.value;
	}

	public get color(): string {
		return this.accountForm.get('color')?.value;
	}

	private get defaultCurrency(): Currency {
		return this.currencies?.length == 1 ? this.currencies[0] : null;
	}

	public get parentAccounts(): Array<Account> {
		return this.accounts.filter(account => {
			return this._creating
					? true
					: this.id != account.id
						&& (this._editAccount?.subAccounts && !this._editAccount.subAccounts.map(subAccount => subAccount.id).includes(account.id))
						&& (
							this._editAccount.hasChildren || this._editAccount.hasTransactions
							? ( account.type == EnumAccountType.GROUP || AccountFormComponent.SUB_ACCOUNT_TYPES[this.type].includes(account.type) )
							: true
						);
		});
	}

	public get types(): Array<EnumAccountType> {
		let types = [];

		if( this._creating ) {
			types = AccountFormComponent.SUB_ACCOUNT_TYPES[this.parent?.type || EnumAccountType.GROUP];
		} else {
			if( this._editAccount.hasChildren || this._editAccount.hasTransactions ) {
				if( [EnumAccountType.STORAGE, EnumAccountType.INVESTMENT].includes(this._editAccount.type) ) {
					types = AccountFormComponent.SUB_ACCOUNT_TYPES[EnumAccountType.STORAGE];
				}else {
					types = [ EnumAccountType[this._editAccount.type] ];
				}
			} else {
				types = AccountFormComponent.SUB_ACCOUNT_TYPES[this.parent?.type || EnumAccountType.GROUP];
			}
		}

		types = types.filter(type => AccountFormComponent.SUB_ACCOUNT_TYPES[this.parent?.type || EnumAccountType.GROUP].includes(type));

		return types;
	}

	constructor(
		private _formBuilder: FormBuilder,
	) {
		this.onSaveEmitter = new EventEmitter<Account>();
		this.onCancelEmitter = new EventEmitter<Account>();

		this.accountForm = this._formBuilder.group({
			id:						[ null ],

			parent:					[ null ],

			name:					[ '',							[ Validators.required, Validators.minLength(2) ] ],
			type:					[ EnumAccountType.STORAGE, [ Validators.required ] ],

			amount:					[ 0.00,							[ Validators.required, Validators.min(0) ] ],
			currency:				[ this.defaultCurrency,			[ Validators.required ] ],

			icon:					[ 'fa-regular fa-credit-card',	[ Validators.required, Validators.minLength(3) ] ],
			color:					[ AccountFormComponent.DEFAULT_COLOR,					[ Validators.required, Validators.pattern('^#[a-fA-F0-9]{6}$') ] ],

			includeInBalance:		[ true ],
			colorText:				[ AccountFormComponent.DEFAULT_COLOR,					[ Validators.required, Validators.pattern('^#[a-fA-F0-9]{6}$') ] ],

			isTemporal:				[ { value: false, disabled: true },	],

			status:					[ EnumStatus.ACTIVE,				],
		});
	}

	public setAccounts(accounts: Array<Account>): void {
		this.accounts = accounts;
	}

	public setCurrencies(currencies: Array<Currency>): void {
		this.currencies = currencies;

		const currency = this.accountForm.get('currency');
		currency.setValue(this.defaultCurrency);
	}

	public edit(account: Account): void {
		console.log(JSON.stringify(account));
		this._editAccount = account;
		this._creating = false;
		this.accountForm.patchValue(account);
		this.accountForm.get('colorText').setValue(account.color);
		this.onTypeSelectChange();
		this.onParentSelectChange();
	}

	public onParentSelectChange(): void {
		if( !AccountFormComponent.SUB_ACCOUNT_TYPES[this.parent?.type || EnumAccountType.GROUP].includes(this.type) ) {
			this.accountForm.get('type').setValue(null);
		}

		if( this.types.length == 1 ) {
			this.accountForm.get('type').setValue(this.types[0]);
			this.disableType();
		} else {
			this.setTypeRequired();
		}
		this.onTypeSelectChange();
	}

	public onTypeSelectChange(): void {
		const value = this.type;
		if( EnumAccountType.GROUP == value ) {
			this.disableAmount();
			this.disableCurrency();
		} else if( EnumAccountType.SUPPLIER == value || EnumAccountType.CONSUMER == value ) {
			this.disableAmount();
			this.setCurrencyRequired();
		} else {
			this.setAmountRequired();
			this.setCurrencyRequired();
		}

		if( [EnumAccountType.GROUP, EnumAccountType.SUPPLIER, EnumAccountType.CONSUMER].includes(value) ) {
			this._disableIncludeInBalance();
		} else {
			this._enableIncludeInBalance();
		}

		if( EnumAccountType.INVESTMENT == value ) {
			this._enableIsTemporal();
		} else {
			this._disableIsTemporal();
		}
	}

	private disableType(): void {
		const type = this.accountForm.get('type');
		type.disable();
		type.setValidators(null);
		type.updateValueAndValidity();
	}

	private setTypeRequired(): void {
		const type = this.accountForm.get('type');
		type.enable();
		type.setValidators([ Validators.required ]);
		type.updateValueAndValidity();
	}

	private disableAmount(): void {
		const amount = this.accountForm.get('amount');
		amount.disable();
		amount.setValue(null);
		amount.setValidators(null);
		amount.updateValueAndValidity();
	}

	private setAmountRequired(): void {
		const amount = this.accountForm.get('amount');
		amount.enable();
		// amount.setValue(0.00);
		amount.setValidators([ Validators.required, Validators.min(0) ]);
		amount.updateValueAndValidity();
	}

	private disableCurrency(): void {
		const currency = this.accountForm.get('currency');
		currency.disable();
		currency.setValue(null);
		currency.setValidators(null);
		currency.updateValueAndValidity();
	}

	private setCurrencyRequired(): void {
		const currency = this.accountForm.get('currency');
		currency.setValue(this.defaultCurrency);
		currency.enable();
		currency.setValidators([ Validators.required ]);
		currency.updateValueAndValidity();
	}

	private _enableIncludeInBalance(): void {
		const currency = this.accountForm.get('includeInBalance');
		currency.enable();
		currency.setValue(true);
		currency.updateValueAndValidity();
	}

	private _disableIncludeInBalance(): void {
		const currency = this.accountForm.get('includeInBalance');
		currency.disable();
		currency.setValue(false);
		currency.updateValueAndValidity();
	}
	
	private _enableIsTemporal(): void {
		const currency = this.accountForm.get('isTemporal');
		currency.enable();
		currency.updateValueAndValidity();
	}

	private _disableIsTemporal(): void {
		const currency = this.accountForm.get('isTemporal');
		currency.disable();
		currency.setValue(false);
		currency.updateValueAndValidity();
	}

	public onSave() {
		if( this.accountForm.invalid ) {
			this.accountForm.markAllAsTouched();
			return;
		}

		this.onSaveEmitter.emit(this.account);
	}
	
	public onCancel() {
		this.onCancelEmitter.emit(this.account);
	}

	public onColorTextChange(): void {
		let color = this.accountForm.get('colorText').value.toUpperCase();
		if( !color.match(/^#[0-9A-F]{6}$/i) ) {
			color = AccountFormComponent.DEFAULT_COLOR;
		}
		this.accountForm.get('color').setValue(color);
	}

	public onColorChange(): void {
		const color = this.accountForm.get('color').value.toUpperCase();
		this.accountForm.get('colorText').setValue(color);
	}
}

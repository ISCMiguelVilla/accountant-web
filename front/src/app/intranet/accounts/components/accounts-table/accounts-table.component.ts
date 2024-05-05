import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { AccountColorPipe } from '../../../../core/pipes/account-color.pipe';

import { Account } from '../../../../core/models/interfaces/account.type';

import { EnumStatus } from '../../../../core/models/enums/enum-status';
import { EnumAccountType } from '../../../../core/models/enums/enum-account-type';

export type AccountsForTransactionTypes = {
	[key in EnumAccountType]: string;
}

@Component({
	selector: 'app-accounts-table',
	standalone: true,
	imports: [
		CommonModule,
		RouterLink,

		AccountColorPipe,

		ButtonModule,
		TableModule,
		TagModule,
	],
	templateUrl: './accounts-table.component.html',
	styles: ``
})
export class AccountsTableComponent {

	private static readonly ACCOUNT_TYPE_COLOR: AccountsForTransactionTypes = {
		[EnumAccountType.GROUP]:		'group',
		[EnumAccountType.SUPPLIER]:		'supplier',
		[EnumAccountType.STORAGE]:		'storage',
		[EnumAccountType.CONSUMER]:		'consumer',
		[EnumAccountType.BUSINESS]:		'business',
		[EnumAccountType.INVESTMENT]:	'investment',
		[EnumAccountType.CREDITOR]:		'creditor',
		[EnumAccountType.DEBTOR]:		'debtor',
	};

	private static readonly STATUS_SEVERITY = {
		[EnumStatus.ACTIVE]:			'success',
		[EnumStatus.DISABLED]:			'warning',
		[EnumStatus.DELETED]:			'danger',
	};

	@Input()
	public accounts: Array<Account> = [];

	public showAmount(type: EnumAccountType): boolean {
		return [EnumAccountType.GROUP, EnumAccountType.SUPPLIER, EnumAccountType.CONSUMER].includes(type);
	}

	public getAccountTypeColor(accountType: EnumAccountType): string {
		return AccountsTableComponent.ACCOUNT_TYPE_COLOR[accountType];
	}

	public getStatusSeverity(status: EnumStatus): string {
		return AccountsTableComponent.STATUS_SEVERITY[status];
	}

	public selectAccount(account: Account) {
		console.log('edit account:', account.name);
	}
}

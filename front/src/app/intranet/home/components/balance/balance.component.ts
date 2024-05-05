import { Component } from '@angular/core';

import { Account } from '../../../../core/models/interfaces/account.type';

import { EnumAccountType } from '../../../../core/models/enums/enum-account-type';
import { CommonModule } from '@angular/common';
import { BalanceItemComponent } from './balance-item.component';

@Component({
	selector: 'app-balance',
	standalone: true,
	imports: [ CommonModule, BalanceItemComponent ],
	templateUrl: './balance.component.html',
	styles: ``,
})
export class BalanceComponent {

	private static readonly PARENT_FILTER = (account: Account) => account.parent == null;
	private static readonly CHILDREN_FILTER = (account: Account, parent: Account) => account.parent && account.parent.id == parent.id;

	private static readonly VALID_ACCOUNTS_FILTER = (type: EnumAccountType) => ![EnumAccountType.SUPPLIER, EnumAccountType.CONSUMER].includes(type);

	public group;

	public setup(accounts: Array<Account>): void {
		this._groupAccounts(accounts)
	}

	private _groupAccounts(accounts: Array<Account>) {
		const group = this._group(accounts);
		this._sum(group);
		this._remove(group);
		this._percentages(group);
		this.group = group;
	}

	private _group(accounts: Array<Account>) {
		return {
			id:						-1,
			name:					'all',
			internalAccount:		null,
			amount:					0,
			total:					0,
			percentage:				0,
			subAccounts:			this._groupChildren(null, accounts, BalanceComponent.PARENT_FILTER),
		}
	}

	private _groupChildren(parent: Account, accounts: Array<Account>, filter: Function) {
		const data = [];

		const children = accounts.filter(account => BalanceComponent.VALID_ACCOUNTS_FILTER(account.type) && filter(account, parent));
		children.forEach(item => data.push({
			id:						item.id,
			name:					item.name,
			internalAccount:		null,
			amount:					item.amount,
			color:					item.color,
			total:					0,
			percentage:				0,
			subAccounts:			this._groupChildren(item, accounts, BalanceComponent.CHILDREN_FILTER)
		}));

		return data;
	}

	private _sum(group) {
		return group.total = group.subAccounts.reduce((collect: number, account: Account) => collect + (account.amount || 0) + this._sum(account), 0);
	}

	private _remove(group) {
		group.subAccounts = group.subAccounts.filter(subAccount => {
			return subAccount.amount || subAccount.total
		});

		const subAccount = group.subAccounts.find(subAccount => {
			return subAccount.subAccounts.length == 0 && group.subAccounts.length == 1
		});
		if( subAccount ) {
			group.internalAccount = subAccount.name;
		}

		group.subAccounts = group.subAccounts.filter(subAccount => {
			return subAccount.subAccounts.length > 0 || group.subAccounts.length > 1
		});

		group.subAccounts.forEach((subAccount) => this._remove(subAccount));
	}

	private _percentages(group) {
		group.subAccounts.forEach(account => {
			account.percentage = this._round(( account.amount + account.total ) * 100 / group.total);
			this._percentages(account);
		});
	}

	private _round(number: number, places: number = 0): number {
		return parseFloat(number.toFixed(places));
	}
}

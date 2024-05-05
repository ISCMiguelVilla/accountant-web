import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { AccountsService } from '../../../../core/services/accounts.service';

import { AccountCardComponent } from '../../../../core/shared/components/account-card/account-card.component';
import { AmountComponent } from '../../../../core/shared/components/amount/amount.component';
import { BalanceComponent } from '../../components/balance/balance.component';
import { NewAccountCardComponent } from '../../components/new-account-card/new-account-card.component';

import { Account } from '../../../../core/models/interfaces/account.type';
import { IncomeStatementComponent } from '../../components/income-statement/income-statement.component';

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [
		CommonModule,
		DividerModule,

		CardModule,

		BalanceComponent,
		IncomeStatementComponent,

		AccountCardComponent,
		AmountComponent,
		NewAccountCardComponent,
	],
	templateUrl: './main.component.html',
	styles: ``
})
export class MainComponent implements OnInit {

	public totals: {};
	public accounts: Array<Account> = [];

	@ViewChild(BalanceComponent)
	private balanceComponent: BalanceComponent;

	constructor(
		private _router: Router,
		private _accountsService: AccountsService,
	) {
	}

	ngOnInit(): void {
		this._accountsService.inUse().subscribe({
			next: (accounts: Array<Account>) => this._accountsInUseNext(accounts),
			error: (error) => console.error(error)
		});

		this._accountsService.findAll().subscribe({
			next: (accounts: Array<Account>) => this._accountsFindAllNext(accounts),
			error: (error) => console.error(error)
		});
	}

	private _accountsInUseNext(accounts: Array<Account>) {
		this.accounts = accounts;

		const totals = this.accounts.reduce((collect, account: Account) => {
			if( !collect[account.currency.iso] ) {
				collect[account.currency.iso] = 0;
			}
			collect[account.currency.iso] = this._round(collect[account.currency.iso] + account.amount);
			return collect;
		}, {});

		this.totals = Object.keys(totals).length != 0 ? totals : { 'EMPTY': 0.0 };
	}

	private _round(number: number, places: number = 2): number {
		return parseFloat(number.toFixed(places));
	}

	private _accountsFindAllNext(accounts: Array<Account>) {
		this.balanceComponent.setup(accounts);
	}

	public onCreate(): void {
		this._router.navigateByUrl('intranet/accounts/create');
	}
}

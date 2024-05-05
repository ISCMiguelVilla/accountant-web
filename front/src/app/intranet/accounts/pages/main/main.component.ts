import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { AccountsService } from '../../../../core/services/accounts.service';
import { AccountsTableComponent } from '../../components/accounts-table/accounts-table.component';

import { Account } from '../../../../core/models/interfaces/account.type';

@Component({
	standalone: true,
	imports: [ RouterLink, ButtonModule, CardModule, DividerModule, AccountsTableComponent ],
	templateUrl: './main.component.html',
	styles: ``
})
export class MainComponent implements OnInit {

	public accounts: Array<Account> = [];

	constructor(
		private _accountsService: AccountsService,
	) {
	}

	ngOnInit(): void {
		this._accountsService.findAll().subscribe({
			next: (accounts: Array<Account>) => this._findAllNext(accounts),
			error: (error) => {
				console.error('ERROR:', error);
			}
		});
	}

	private _findAllNext(accounts: Array<Account>): void {
		this.accounts = accounts;
	}
}

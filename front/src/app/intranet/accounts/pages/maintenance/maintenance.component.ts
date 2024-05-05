import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { MessageService } from 'primeng/api';

import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';

import { AccountsService } from '../../../../core/services/accounts.service';
import { CurrenciesService } from '../../../../core/services/currencies.service';

import { AccountCardComponent } from '../../../../core/shared/components/account-card/account-card.component';
import { AccountFormComponent } from '../../components/account-form/account-form.component';

import { Account } from '../../../../core/models/interfaces/account.type';
import { Currency } from '../../../../core/models/interfaces/currency.type';
import { AccountantException } from '../../../../core/models/interfaces/accountant-exception.type';
import { EnumAccountantExceptionType } from '../../../../core/models/enums/enum-accountant-exception-type';

@Component({
	standalone: true,
	imports: [
		CommonModule,

		CardModule,
		DividerModule,
		ToastModule,

		AccountCardComponent,
		AccountFormComponent,
	],
	providers: [ MessageService ],
	templateUrl: './maintenance.component.html',
	styles: `

	`
})
export class MaintenanceComponent implements OnInit {

	@ViewChild('accountForm')
	public accountForm: AccountFormComponent;

	private _id: number;
	private _creating: boolean = true;

	public get title(): string {
		return this._creating ? 'New account' : 'Edit account';
	}

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
		private _messageService: MessageService,

		private _accountsService: AccountsService,
		private _currenciesService: CurrenciesService,
	) {
	}

	public ngOnInit(): void {
		this._accountsService.findAll()
				.pipe(
					tap((accounts) => this._accountsFindAllNext(accounts)),
					switchMap(() => this._currenciesService.usable()),
					tap((currencies) => this._currenciesUsableNext(currencies))
				)
				.subscribe({
					next: (_) => {
						if( !this._router.url.includes('edit') ) {
							return;
						}
						this._getEditableAccount();
					},
					error: (error: any) => {
						console.error(error);
						this._router.navigateByUrl('/page-not-found');
					}
				});
	}

	private _getEditableAccount() {
		this._activatedRoute.params
				.pipe(
					switchMap(({ id }) => {
						this._id = id;
						return this._accountsService.findById(id);
					})
				)
				.subscribe({
					next: (account: Account) => {
						this._accountsFindByIdNext(account);
					},
					error: (error) => {
						console.error(error);
						this._router.navigateByUrl('/page-not-found');
					}
				});
	}

	private _accountsFindAllNext(accounts: Array<Account>): void {
		this.accountForm.setAccounts(accounts);
	}

	private _currenciesUsableNext(currencies: Array<Currency>): void {
		this.accountForm.setCurrencies(currencies);
	}

	private _accountsFindByIdNext(account: Account): void {
		this._creating = false;
		this._id = account.id;
		this.accountForm.edit(account);
	}

	public onSave(account: Account) {
		if( this._creating ) {
			this._create(account);
		} else {
			this._update(account);
		}
	}

	private _create(account: Account) {
		this._accountsService.create(account)
				.subscribe({
					next: (account: Account): void => {
						this._accountsCreateNext(account);
					},
					error: (httpErrorResponse: HttpErrorResponse): void => {
						console.error('MaintenanceComponent._create:', httpErrorResponse);
						this._showErrorMessage(httpErrorResponse.error);
					},
				});
	}

	private _accountsCreateNext(account: Account): void {
		this._accountsFindByIdNext(account);
		this._showSavedMessage();
	}

	private _update(account: Account) {
		this._accountsService.update(this._id, account)
				.subscribe({
					next: (account: Account): void => {
						this._accountsUpdateNext(account);
					},
					error: (httpErrorResponse: HttpErrorResponse): void => {
						console.error('MaintenanceComponent._update:', httpErrorResponse);
						this._showErrorMessage(httpErrorResponse.error);
					},
				});
	}

	private _accountsUpdateNext(account: Account): void {
		this.accountForm.edit(account);
		this._showSavedMessage();
	}

	private _showSavedMessage() {
		this._messageService.clear();
		this._messageService.add({
			severity:	'success',
			summary:	'Success',
			detail:		'Account saved',
		});
	}

	private _showErrorMessage(accountantException: AccountantException): void {
		this._messageService.clear();
		this._messageService.add({
			severity:	EnumAccountantExceptionType.MALFORMED_REQUEST == accountantException.type ? 'warn' : 'error',
			summary:	'Error',
			detail:		accountantException.message,
		});
	}

	public onCancel() {
		this._router.navigateByUrl('/intranet/accounts');
	}
}

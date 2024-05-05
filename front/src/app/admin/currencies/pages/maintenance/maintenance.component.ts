import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CardModule } from 'primeng/card';

import { CurrenciesService } from '../../../../core/services/currencies.service';

import { CurrencyFormComponent } from '../../components/currency-form/currency-form.component';

import { Currency } from '../../../../core/models/interfaces/currency.type';

@Component({
	standalone: true,
	imports: [ CardModule, CurrencyFormComponent ],
	templateUrl: './maintenance.component.html',
	styles: ``
})
export class MaintenanceComponent {

	public _id: number;
	public _creating: boolean = true;

	@ViewChild('currencyForm')
	public currencyForm: CurrencyFormComponent;

	public get title(): string {
		return this._creating ? 'New currency' : 'Edit currency';
	}

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _router: Router,

		private _currenciesService: CurrenciesService,
	) {
		if( !this._router.url.includes('edit') )
			return;
		this._getEditableCurrency();
	}

	private _getEditableCurrency() {
		this._activatedRoute
			.params
			.pipe(
				switchMap(({ id }) => {
					this._id = id;
					return this._currenciesService.findById(id);
				})
			)
			.subscribe({
				next: (currency: Currency) => this._currenciesFindByIdNext(currency),
				error: (error) => {
					console.error(error);
					this._router.navigateByUrl('/');
				}
			});
	}

	private _currenciesFindByIdNext(currency: Currency): void {
		this._creating = false;
		this.currencyForm.edit(currency);
	}

	public onSave(currency: Currency) {
		if( this._creating ) {
			this._create(currency);
		} else {
			this._update(currency);
		}
	}

	private _create(currency: Currency) {
		this._currenciesService.create(currency).subscribe({
			next: (currency: Currency) => this._currencyCreateNext(currency),
			error: (error) => {
				console.error(error);
			}
		});
	}

	private _currencyCreateNext(currency: Currency): void {
		this._router.navigate(['/admin/currencies', currency.id, 'edit']);
	}

	private _update(currency: Currency) {
		this._currenciesService.update(this._id, currency).subscribe({
			next: (currency: Currency) => this._currenciesUpdateNext(currency),
			error: (error) => {
				console.error(error);
			}
		});
	}

	private _currenciesUpdateNext(currency: Currency): void {
		this.currencyForm.edit(currency);
	}

	public onCancel() {
		this._router.navigateByUrl('/admin/currencies');
	}
}

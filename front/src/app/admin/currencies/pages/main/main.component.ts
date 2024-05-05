import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

import { CurrenciesService } from '../../../../core/services/currencies.service';
import { Currency } from '../../../../core/models/interfaces/currency.type';

import { CurrenciesTableComponent } from '../../components/currencies-table/currencies-table.component';

@Component({
	standalone: true,
	imports: [ RouterLink, ButtonModule, CardModule, DividerModule, CurrenciesTableComponent ],
	templateUrl: './main.component.html',
	styles: ``
})
export class MainComponent {

	public currencies: Array<Currency> = [];

	constructor(
		private _currenciesService: CurrenciesService,
	) {
	}

	ngOnInit(): void {
		this._currenciesService.findAll().subscribe({
			next: (currencies: Array<Currency>) => this._findAllNext(currencies),
			error: (error) => {
				console.error('ERROR:', error);
			}
		});
	}

	private _findAllNext(currencies: Array<Currency>): void {
		this.currencies = currencies;
	}
}

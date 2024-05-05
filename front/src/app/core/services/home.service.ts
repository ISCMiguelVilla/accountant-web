import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs';

import { BalanceItemView } from '../models/interfaces/balance-item-view.type';

import { EnumGroupSize } from '../models/enums/enum-group-size.type';
import { IncomeStatementDimension } from '../models/interfaces/income-statement-dimension.type';

@Injectable({
	providedIn: 'root'
})
export class HomeService {

	private get URL() {
		return `${environment.API_URL}/home`;
	};

	constructor(
		private _httpClient: HttpClient,
	) { }

	public balance(filters): Observable<Array<BalanceItemView>> {
		const params = new HttpParams()
				.set('dimension',		filters.dimension)
				.set('size',			filters.size)
				.set('reference',		filters.reference);

		return this._httpClient.get<Array<BalanceItemView>>(`${this.URL}/balance`, {
			params: params
		});
	}
}

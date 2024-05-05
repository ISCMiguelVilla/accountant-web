import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs';

import { Currency } from '../models/interfaces/currency.type';

@Injectable({
	providedIn: 'root'
})
export class CurrenciesService {

	private get URL() {
		return `${environment.API_URL}/currencies`;
	};

	constructor(
		private _httpClient: HttpClient,
	) { }

	public findAll(): Observable<Array<Currency>> {
		return this._httpClient.get<Array<Currency>>(this.URL);
	}

	public create(currency: Currency): Observable<Currency> {
		return this._httpClient.post<Currency>(this.URL, currency);
	}

	public findById(id: number): Observable<Currency> {
		return this._httpClient.get<Currency>(`${this.URL}/${id}`);
	}

	public update(id: number, currency: Currency): Observable<Currency> {
		return this._httpClient.patch<Currency>(`${this.URL}/${id}`, currency);
	}

	public usable(): Observable<Array<Currency>> {
		return this._httpClient.get<Array<Currency>>(`${this.URL}/usable`);
	}
}

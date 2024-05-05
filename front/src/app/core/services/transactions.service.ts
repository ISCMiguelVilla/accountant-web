import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs';

import { Transaction } from '../models/interfaces/transaction.type';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

	private get URL() {
		return `${environment.API_URL}/transactions`;
	};

	constructor(
		private _httpClient: HttpClient,
	) { }

	public create(transaction: Transaction): Observable<Transaction> {
		return this._httpClient.post<Transaction>(this.URL, transaction);
	}

	public findById(id: number): Observable<Transaction> {
		return this._httpClient.get<Transaction>(`${this.URL}/${id}`);
	}

	public list(): Observable<Array<Transaction>> {
		return this._httpClient.get<Array<Transaction>>(`${this.URL}/list`);
	}

	public createBulk(transactions: Array<Transaction>): Observable<Array<Transaction>> {
		return this._httpClient.post<Array<Transaction>>(`${this.URL}/bulk`, transactions);
	}

	public apply(id: number): Observable<Transaction> {
		return this._httpClient.patch<Transaction>(`${this.URL}/apply/${id}`, null);
	}
}

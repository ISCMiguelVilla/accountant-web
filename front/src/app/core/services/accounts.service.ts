import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

import { Account } from '../models/interfaces/account.type';

@Injectable({
	providedIn: 'root'
})
export class AccountsService {

	private get URL() {
		return `${environment.API_URL}/accounts`;
	};

	constructor(
		private _httpClient: HttpClient,
	) { }

	public findAll(): Observable<Array<Account>> {
		return this._httpClient.get<Array<Account>>(this.URL);
	}

	public create(account: Account): Observable<Account> {
		return this._httpClient.post<Account>(this.URL, account);
	}

	public findById(id: number): Observable<Account> {
		return this._httpClient.get<Account>(`${this.URL}/${id}`);
	}

	public update(id: number, account: Account): Observable<Account> {
		return this._httpClient.patch<Account>(`${this.URL}/${id}`, account);
	}

	public usableAccounts(): Observable<Array<Account>> {
		return this._httpClient.get<Array<Account>>(`${this.URL}/usable-accounts`);
	}

	public inUse(): Observable<Array<Account>> {
		return this._httpClient.get<Array<Account>>(`${this.URL}/in-use`);
	}
}

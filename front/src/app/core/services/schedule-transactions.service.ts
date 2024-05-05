import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs';

import { CronExpressionView, ScheduleTransaction } from '../models/interfaces/schedule-transaction.type';
import { EnumStatus } from '../models/enums/enum-status';

@Injectable({
  providedIn: 'root'
})
export class ScheduleTransactionsService {

	private get URL() {
		return `${environment.API_URL}/schedule-transactions`;
	};

	constructor(
		private _httpClient: HttpClient,
	) { }

	public findAll(): Observable<Array<ScheduleTransaction>> {
		return this._httpClient.get<Array<ScheduleTransaction>>(`${this.URL}`);
	}

	public create(scheduleTransaction: ScheduleTransaction): Observable<ScheduleTransaction> {
		return this._httpClient.post<ScheduleTransaction>(this.URL, scheduleTransaction);
	}

	public findById(id: number): Observable<ScheduleTransaction> {
		return this._httpClient.get<ScheduleTransaction>(`${this.URL}/${id}`);
	}

	public update(id: number, scheduleTransaction: ScheduleTransaction): Observable<ScheduleTransaction> {
		return this._httpClient.patch<ScheduleTransaction>(`${this.URL}/${id}`, scheduleTransaction);
	}

	public updateStatus(id: number, status: EnumStatus): Observable<ScheduleTransaction> {
		const params = new HttpParams().set('status', status);

		return this._httpClient.patch<ScheduleTransaction>(`${this.URL}/${id}/status`, null, {
			params: params
		});
	}

	public nextExecution(id: number, reference: Date): Observable<ScheduleTransaction> {
		const params = reference ? new HttpParams().set('reference', reference.toDateString()) : null;

		return this._httpClient.patch<ScheduleTransaction>(`${this.URL}/${id}/next-execution`, null, {
			params: params
		});
	}

	public applicable(): Observable<Array<ScheduleTransaction>> {
		return this._httpClient.get<Array<ScheduleTransaction>>(`${this.URL}/applicable`);
	}

	public check(cronExpression: string): Observable<CronExpressionView> {
		const params = new HttpParams().set('cron-expression', cronExpression);
		return this._httpClient.get<CronExpressionView>(`${this.URL}/check`, {
			params: params
		});
	}
}

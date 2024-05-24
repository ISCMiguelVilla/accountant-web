import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

import { AuthResponse, SingIn, SingUp } from '../models/interfaces/auth.type';

@Injectable({
	providedIn: 'root'
})
export class AuthServiceService {

	private static readonly AUTH_TOKEN_KEY = 'AUTH_TOKEN';

	private get URL() {
		return `${environment.API_URL}/auth`;
	};

	constructor(
		private _httpClient: HttpClient,
	) { }

	public singUp(singUp: SingUp): Observable<AuthResponse> {
		return this._httpClient.post<AuthResponse>(`${this.URL}/sign-up`, singUp);
	}

	public singIn(singIn: SingIn): Observable<AuthResponse> {
		return this._httpClient.post<AuthResponse>(`${this.URL}/sign-in`, singIn);
	}

	public singOut(): void {
		localStorage.removeItem(AuthServiceService.AUTH_TOKEN_KEY);
	}

	public storeToken(authResponse: AuthResponse): void {
		localStorage.setItem('auth', JSON.stringify(this.getPayload(authResponse.token)));
		localStorage.setItem(AuthServiceService.AUTH_TOKEN_KEY, authResponse.token);
	}

	public getPayload(token: string) {
		return JSON.parse(atob(token.split('.')[1]));
	}

	public get token(): string {
		return localStorage.getItem(AuthServiceService.AUTH_TOKEN_KEY);
	}

	public get isAuthenticated(): boolean {
		if( this.token == null ) {
			return false;
		}
		const now = new Date().getTime() / 1000;
		return this.getPayload(this.token).exp > now;
	}
}

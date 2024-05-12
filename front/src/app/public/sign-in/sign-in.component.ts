import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { AuthResponse, SingIn } from '../../core/models/interfaces/auth.type';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink,

		AutoFocusModule,
		ButtonModule,
		InputTextModule,
		PasswordModule,
		ToastModule,
	],
	providers: [ MessageService ],
	templateUrl: './sign-in.component.html',
	styles: ``
})
export class SingInComponent {

	public signInForm: FormGroup = this._formBuilder.group({
		username:				[ null, [ Validators.required, Validators.email ] ],
		password:				[ null, [ Validators.required, Validators.minLength(8) ] ],
	});

	public get signInData() {
		return this.signInForm.getRawValue() as SingIn;
	}

	constructor(
		private _router: Router,

		private _formBuilder: FormBuilder,
		private _messageService: MessageService,

		private _authServiceService: AuthServiceService,
	) {
	}

	public onSave(): void {
		if( this.signInForm.invalid ) {
			this.signInForm.markAllAsTouched();
			return;
		}

		this.signIn();
	}

	private signIn(): void {
		this._authServiceService.singIn(this.signInData).subscribe({
			next: (authResponse: AuthResponse): void => this._authSignInNext(authResponse),
			error: (httpErrorResponse: HttpErrorResponse): void => this._authSignInError(httpErrorResponse),
		});
	}

	private _authSignInNext(authResponse: AuthResponse): void {
		this._authServiceService.storeToken(authResponse);

		this._router.navigate(['/intranet']);
	}

	private _authSignInError(httpErrorResponse: HttpErrorResponse): void {
		console.log(httpErrorResponse);
		this._messageService.clear();
		if( httpErrorResponse.status == 401 ) {
			this._messageService.add({
				severity:	'warn',
				summary:	'Waning',
				detail:		httpErrorResponse.error.message,
			});
		}
	}
}

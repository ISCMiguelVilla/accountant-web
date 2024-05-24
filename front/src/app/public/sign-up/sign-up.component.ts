import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthResponse, SingUp } from '../../core/models/interfaces/auth.type';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink,

		AutoFocusModule,
		ButtonModule,
		ConfirmDialogModule,
		DialogModule,
		InputTextModule,
		PasswordModule,
	],
	templateUrl: './sign-up.component.html',
	styles: ``
})
export class SingUpComponent {

	public modalMessageVisible: boolean = false;

	public signUpForm: FormGroup = this._formBuilder.group({
		name:					[ null, [ Validators.required, Validators.minLength(3) ] ],
		username:				[ null, [ Validators.required, Validators.email ] ],
		password:				[ null, [ Validators.required, Validators.minLength(8) ] ],
	});

	public get signUpData() {
		return this.signUpForm.getRawValue() as SingUp;
	}

	constructor(
		private _router: Router,

		private _formBuilder: FormBuilder,

		private _authServiceService: AuthServiceService,
	) {
	}

	public onSave(): void {
		if( this.signUpForm.invalid ) {
			this.signUpForm.markAllAsTouched();
			return;
		}

		this.signUp();
	}

	private signUp(): void {
		console.log('this.signUpData:', this.signUpData);
		this._authServiceService.singUp(this.signUpData).subscribe({
			next: (authResponse: AuthResponse): void => this._authSignUpNext(authResponse),
			error: (error): void => console.error(error),
		});
	}

	private _authSignUpNext(authResponse: AuthResponse): void {
		this.modalMessageVisible = true;
	}

	public onDoneClick(): void {
		this.modalMessageVisible = false;
		this._router.navigate(['/sign-in']);
	}
}

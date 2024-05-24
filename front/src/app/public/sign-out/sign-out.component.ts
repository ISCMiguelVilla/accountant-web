import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';

@Component({
	selector: 'app-sign-out',
	standalone: true,
	imports: [
		RouterLink
	],
	templateUrl: './sign-out.component.html',
	styles: ``
})
export class SignOutComponent implements OnInit {

	public constructor(
		private _authServiceService: AuthServiceService,
	) {
	}

	public ngOnInit(): void {
		this._authServiceService.singOut();
	}
}

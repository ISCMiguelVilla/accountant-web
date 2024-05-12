import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
	const authServiceService = inject(AuthServiceService);
	if( authServiceService.isAuthenticated ) {
		return true;
	}

	authServiceService.singOut();
	inject(Router).navigate(['/sign-in'])
	return false;
};

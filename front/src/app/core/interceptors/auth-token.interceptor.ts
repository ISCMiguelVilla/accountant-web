import { HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

	const token = inject(AuthServiceService).token;

	if( token != undefined ) {
		const authReq = req.clone({
			headers: req.headers.set('Authorization', `Bearer ${token}`),
		});
		return next(authReq);
	}

	return next(req);
};

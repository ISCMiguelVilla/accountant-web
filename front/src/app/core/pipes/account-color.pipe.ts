import { Pipe, PipeTransform } from '@angular/core';
import { EnumAccountType } from '../models/enums/enum-account-type';

@Pipe({
	name: 'accountColor',
	standalone: true
})
export class AccountColorPipe implements PipeTransform {

	private static readonly SEVERITIES = {
		[EnumAccountType.GROUP]:		'primary',

		[EnumAccountType.SUPPLIER]:		'success',
		[EnumAccountType.STORAGE]:		'warning',
		
		[EnumAccountType.CONSUMER]:		'danger',

		[EnumAccountType.BUSINESS]:		'success',
		[EnumAccountType.INVESTMENT]:	'success',

		[EnumAccountType.CREDITOR]:		'warning',
		[EnumAccountType.DEBTOR]:		'danger',
	};

	transform(accountType: EnumAccountType, ...args: unknown[]): string {
		return AccountColorPipe.SEVERITIES[accountType];
	}
}

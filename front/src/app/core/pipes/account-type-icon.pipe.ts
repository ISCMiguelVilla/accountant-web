import { Pipe, PipeTransform } from '@angular/core';
import { EnumAccountType } from '../models/enums/enum-account-type';

@Pipe({
	name: 'accountTypeIcon',
	standalone: true
})
export class AccountTypeIconPipe implements PipeTransform {

	private static readonly ICONS = {
		[EnumAccountType.GROUP]:			'fa-solid fa-layer-group',

		[EnumAccountType.SUPPLIER]:			'fa-solid fa-plus',
		[EnumAccountType.STORAGE]:			'fa-solid fa-building-columns',

		[EnumAccountType.CONSUMER]:			'fa-solid fa-minus',

		[EnumAccountType.BUSINESS]:			'fa-solid fa-building',
		[EnumAccountType.INVESTMENT]:		'fa-solid fa-arrow-trend-up',

		[EnumAccountType.CREDITOR]:			'fa-solid fa-handshake',
		[EnumAccountType.DEBTOR]:			'fa-regular fa-handshake',
	}

	public transform(type: EnumAccountType): string {
		return AccountTypeIconPipe.ICONS[type];
	}

}

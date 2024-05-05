import { Pipe, PipeTransform } from '@angular/core';
import { EnumTransactionType } from '../models/enums/enum-transaction-type';

@Pipe({
	name: 'transactionTypeIcon',
	standalone: true
})
export class TransactionTypeIconPipe implements PipeTransform {

	private static readonly ICONS = {
		[EnumTransactionType.INCOME]:			'fa-solid fa-plus',
		[EnumTransactionType.EXPENSE]:			'fa-solid fa-minus',
		[EnumTransactionType.TRANSFER]:			'fa-solid fa-right-left',

		[EnumTransactionType.INVEST]:			'fa-solid fa-folder-plus',
		[EnumTransactionType.DIVIDEND]:			'fa-solid fa-arrow-trend-up',
		[EnumTransactionType.PROFIT]:			'fa-solid fa-folder-minus',
		[EnumTransactionType.INTEREST]:			'fa-solid fa-arrow-trend-down',

		[EnumTransactionType.BORROW]:			'fa-solid fa-handshake',
		[EnumTransactionType.COLLECTION]:		'fa-solid fa-hand-holding-dollar',
		[EnumTransactionType.DEBT]:				'fa-solid fa-handshake',
		[EnumTransactionType.PAYMENT]:			'fa-solid fa-hand-holding-dollar',
	}

	public transform(type: EnumTransactionType): string {
		return TransactionTypeIconPipe.ICONS[type];
	}
}

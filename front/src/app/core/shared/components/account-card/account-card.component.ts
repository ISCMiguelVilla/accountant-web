import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { AccountColorPipe } from '../../../pipes/account-color.pipe';

import { AmountComponent } from '../amount/amount.component';

import { Account } from '../../../models/interfaces/account.type';
import { EnumAccountType } from '../../../models/enums/enum-account-type';

@Component({
	selector: 'app-account-card',
	standalone: true,
	imports: [ CommonModule, ButtonModule, CardModule, TagModule, AccountColorPipe, AmountComponent ],
	templateUrl: './account-card.component.html',
	styles: ``
})
export class AccountCardComponent {

	@Input()
	public account: Account;

	public get amountType(): string {
		let amountType = 'SHOW';

		if( [EnumAccountType.SUPPLIER, EnumAccountType.CONSUMER].includes(this.account.type) ) {
			amountType = 'INFINITE';
		} else if( [EnumAccountType.GROUP].includes(this.account.type) ) {
			amountType = 'NON_APPLIES';
		}

		return amountType;
	}
}

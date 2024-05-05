import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { Currency } from '../../../../core/models/interfaces/currency.type';
import { EnumStatus } from '../../../../core/models/enums/enum-status';

@Component({
	selector: 'app-currencies-table',
	standalone: true,
	imports: [ CommonModule, RouterLink, ButtonModule, TableModule, TagModule ],
	templateUrl: './currencies-table.component.html',
	styles: ``
})
export class CurrenciesTableComponent {

	private static readonly STATUS_SEVERITY = {
		[EnumStatus.ACTIVE]:			'success',
		[EnumStatus.DISABLED]:			'warning',
		[EnumStatus.DELETED]:			'danger',
	};

	@Input()
	public currencies: Array<Currency> = [];

	public getStatusSeverity(status: EnumStatus): string {
		return CurrenciesTableComponent.STATUS_SEVERITY[status];
	}
}

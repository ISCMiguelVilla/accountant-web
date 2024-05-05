import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-balance-item',
	standalone: true,
	imports: [ CommonModule ],
	templateUrl: './balance-item.component.html',
	styles: ``
})
export class BalanceItemComponent {

	@Input()
	public account;
}

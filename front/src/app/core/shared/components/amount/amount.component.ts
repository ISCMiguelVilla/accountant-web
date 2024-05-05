import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-amount',
	standalone: true,
	imports: [ CommonModule ],
	templateUrl: './amount.component.html',
	styles: ``
})
export class AmountComponent {

	@Input()
	public amount: number;

	@Input()
	public currency: string;

	public get integerPart(): number {
		return Number((this.amount || 0.0).toString().split(".")[0]);
	}

	public get floatPart(): string {
		return ((this.amount || 0.0).toString().split(".")[1] || '00').padEnd(2, '0');
	}
}

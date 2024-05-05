import { Component, EventEmitter,  Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

import { Currency } from '../../../../core/models/interfaces/currency.type';
import { EnumStatus } from '../../../../core/models/enums/enum-status';

@Component({
	selector: 'app-currency-form',
	standalone: true,
	imports: [ CommonModule, ReactiveFormsModule, ButtonModule, DropdownModule, ColorPickerModule, InputGroupModule, InputTextModule ],
	templateUrl: './currency-form.component.html',
	styles: ``
})
export class CurrencyFormComponent {

	public readonly status = EnumStatus;

	@Output()
	public onSaveEmitter: EventEmitter<Currency>;

	@Output()
	public onCancelEmitter: EventEmitter<Currency>;

	public currencyForm: FormGroup = this._formBuilder.group({
		id:						[ null ],
		name:					[ '',							[ Validators.required, Validators.minLength(3) ] ],
		iso:					[ '',							[ Validators.required, Validators.minLength(3) ] ],
		color:					[ '#14B8A6',					[ Validators.required, Validators.pattern('^#[a-fA-F0-9]{6}$') ] ],
		status:					[ EnumStatus.ACTIVE, ],
	});

	private _creating: boolean | true;

	private get _currency(): Currency {
		return this.currencyForm.getRawValue() as Currency;
	}

	public get color(): string {
		return this.currencyForm.get('color')?.value;
	}

	constructor(
		private _formBuilder: FormBuilder,
	) {
		this.onSaveEmitter = new EventEmitter<Currency>();
		this.onCancelEmitter = new EventEmitter<Currency>();
	}

	public edit(currency: Currency): void {
		this._creating = false;
		this.currencyForm.patchValue(currency);
	}

	public onSave() {
		if( this.currencyForm.invalid ) {
			this.currencyForm.markAllAsTouched();
			return;
		}

		this.onSaveEmitter.emit(this._currency);
	}
	
	public onCancel() {
		this.onCancelEmitter.emit(this._currency);
	}
}

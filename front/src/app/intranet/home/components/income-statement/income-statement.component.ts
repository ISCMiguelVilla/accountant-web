import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import Chart from 'chart.js/auto';

import { ButtonModule } from 'primeng/button';

import { HomeService } from '../../../../core/services/home.service';

import { BalanceItemView } from '../../../../core/models/interfaces/balance-item-view.type';

import { EnumGroupSize } from '../../../../core/models/enums/enum-group-size.type';
import moment from 'moment';

export enum EnumDimension {
	YEAR				= 'YEAR',
	MONTH				= 'MONTH',
	WEEK				= 'WEEK',
	DAY					= 'DAY',
}

@Component({
	selector: 'app-income-statement',
	standalone: true,
	imports: [ CommonModule, ButtonModule ],
	providers: [ DecimalPipe ],
	templateUrl: './income-statement.component.html',
	styles: ``,
})
export class IncomeStatementComponent implements OnInit {

	public readonly enumDimension = EnumDimension;

	public incomeStatementChar: any;

	private static readonly SIZE_LIMITS = {
		[EnumDimension.YEAR]:	{ lower: 2,	upper: 4,	defaultSize: 2,	format: 'YYYY',			groupSize: EnumGroupSize.YEAR,	operateWith: 'years',	multiplier: 1 },
		[EnumDimension.MONTH]:	{ lower: 3,	upper: 12,	defaultSize: 6,	format: 'YYYY-MM',		groupSize: EnumGroupSize.MONTH,	operateWith: 'months',	multiplier: 1 },
		[EnumDimension.WEEK]:	{ lower: 4,	upper: 12,	defaultSize: 4,	format: 'YYYY-MM-DD',	groupSize: EnumGroupSize.DAY,	operateWith: 'days',	multiplier: 7 },
		[EnumDimension.DAY]:	{ lower: 7,	upper: 15,	defaultSize: 7,	format: 'YYYY-MM-DD',	groupSize: EnumGroupSize.DAY,	operateWith: 'days',	multiplier: 1 },
	}

	private get _dimension() {
		return IncomeStatementComponent.SIZE_LIMITS[this.filters.dimension];
	}

	private get _lowerLimit() {
		return this._dimension.lower;
	}

	private get _upperLimit() {
		return this._dimension.upper;
	}

	private get _defaultSize() {
		return this._dimension.defaultSize;
	}

	private get _format() {
		return this._dimension.format;
	}

	private get _operateWith() {
		return this._dimension.operateWith as moment.unitOfTime.DurationConstructor;
	}

	private get _multiplier() {
		return this._dimension.multiplier;
	}

	private get _reference() {
		return moment().format(this._dimension.format);
	}

	public filters = {
		dimension:	EnumDimension.MONTH,
		size:		6,
		reference:	moment().format(IncomeStatementComponent.SIZE_LIMITS[EnumDimension.MONTH].format),
	};

	constructor(
		private _homeService: HomeService,
	) {
	}

	public ngOnInit(): void {
		this.getData();
	}

	public getData() {
		this._homeService.balance(this.filters).subscribe({
			next: (balanceItemView: Array<BalanceItemView>) => this.setup(balanceItemView),
			error: (error) => console.error(error)
		});
	}

	private setup(balanceItemView: Array<BalanceItemView>): void {
		const labels = this.createLabels();
		const data = this.map(balanceItemView);

		console.log('labels:', JSON.stringify(labels));
		console.log('data:', JSON.stringify(data));

		const datasets = {
			gains: [],
			revenue: [],
			expenses: [],
		};

		labels.forEach(label => {
			datasets.gains.push(data[label]?.ADDITION || null);
			datasets.revenue.push(data[label]?.TOTAL || null);
			datasets.expenses.push(data[label]?.SUBTRACTION || null);
		});

		console.log('datasets:', JSON.stringify(datasets));

		if( !this.incomeStatementChar ) {
			this.create(labels, datasets);
		} else {
			this.update(labels, datasets);
		}
	}

	private createLabels() {
		const wideLeft = Math.ceil(this.filters.size / 2);
		const wideRight = this.filters.size - wideLeft;

		const left = moment(this.filters.reference, this._format).subtract(wideLeft, this._operateWith);

		const labels = [];
		labels.push(left.format(this._format));
		for(let i = 0 ; i < wideLeft ; i++) {
			left.add(1, this._operateWith);
			labels.push(left.format(this._format));
		}

		for(let i = 0 ; i <= wideRight; i++) {
			left.add(1, this._operateWith);
			labels.push(left.format(this._format));
		}

		return labels;
	}

	private map(balanceItemView: Array<BalanceItemView>) {
		return balanceItemView.reduce((collect, item) => {
			collect[item.date] = collect[item.date] || {};
			collect[item.date][item.operationType] = item.amount;
			collect[item.date].TOTAL = (collect[item.date].ADDITION || 0) - (collect[item.date].SUBTRACTION || 0);
			return collect;
		}, {});
	}

	private create(labels, datasets) {
		this.incomeStatementChar = new Chart('balance', {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Gains',
						data: datasets.gains,
						borderColor: '#66ccff',
						backgroundColor: '#99ccff',
						tension: 0.4,
					},
					{
						label: 'Revenue',
						data: datasets.revenue,
						borderColor: '#33cc33',
						backgroundColor: '#00ff99',
						tension: 0.4,
					},
					{
						label: 'Expenses',
						data: datasets.expenses,
						borderColor: '#ffcc99',
						backgroundColor: '#ffff99',
						tension: 0.4,
					},
				]
			},
		});
	}

	private update(labels, datasets) {
		this.incomeStatementChar.data.labels = labels;
		this.incomeStatementChar.data.datasets.forEach((dataset) => {
			dataset.data = datasets[dataset.label.toLowerCase()];
		});
		this.incomeStatementChar.update();
	}

	public getDimensionSeverity(dimension: EnumDimension): string {
		return this.filters.dimension == dimension ? 'primary' : 'secondary';
	}

	public setDimension(dimension: EnumDimension): void {
		this.filters.dimension = dimension;
		this.filters.size = this._defaultSize;
		this.filters.reference = this._reference;
		this.getData();
	}

	public onZoomOutClick(): void {
		if( this._upperLimit > this.filters.size ) {
			this.filters.size += 1;
			this.getData();
		}
	}

	public onZoomInClick(): void {
		if( this._lowerLimit < this.filters.size ) {
			this.filters.size -= 1;
			this.getData();
		}
	}

	public onLeftClick(): void {
		const next = moment(this.filters.reference, this._format)
				.subtract(1, this._operateWith);
		if( true ) {
			this.filters.reference = next.format(this._format);
			this.getData();
		}
	}

	public onRightClick(): void {
		const next = moment(this.filters.reference, this._format).add(1, this._operateWith);
		if( moment().isAfter(next) ) {
			this.filters.reference = next.format(this._format);
			this.getData();
		}
	}
}

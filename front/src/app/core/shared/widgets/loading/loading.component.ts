import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-loading',
	standalone: true,
	imports: [ CommonModule, ProgressSpinnerModule ],
	templateUrl: './loading.component.html',
	styles: `
		.progress-spinner {
			position: fixed;
			z-index: 999;
			height: 2em;
			width: 2em;
			overflow: show;
			margin: auto;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		.progress-spinner:before {
			content: '';
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.53);
		}
	`
})
export class LoadingComponent {

	public show: boolean = true;
	public loading: boolean = true;

	public disable(): void {
		this.loading = true;
	}

	public enable(after: number = 1): void {
		setTimeout(() => {
			this.loading = false;
		}, after * 1000);
	}

	public enableSwitch<T>(data: T = null, after: number = 0.3): Observable<T> {
		return new Observable((observer) => {
			setTimeout(() => {
				this.loading = false;
				observer.next(data);
			}, after * 1000);
		});
	}

	/**
	 * this._accountsService.create(account)
				.pipe(switchMap((data) => this.loadingComponent.enableSwitch(data)))
				.subscribe({
	 * 
	 */
}

import { Component, AfterViewChecked, ElementRef } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{

	constructor(
		private _elementRef : ElementRef
	){}

	ngAfterViewChecked(){
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = '../assets/js/custom.js';
		this._elementRef.nativeElement.appendChild(s);
	}

}

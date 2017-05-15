import { NgModule } from '@angular/core';

// Pipe
import { SortPipe } from './pipes/sort.pipe';
// Directive
import { DatePickerDirective } from './directives/date-picker.directive';
// Components


@NgModule({
	declarations: [
		SortPipe,
		DatePickerDirective
	],
	imports: [

	],
	providers: [],
	bootstrap: [],
	exports: [
		SortPipe,
		DatePickerDirective
	]
})
export class CoreModule { }
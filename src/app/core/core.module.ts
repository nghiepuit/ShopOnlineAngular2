import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Pipe
import { SortPipe } from './pipes/sort.pipe';
// Directive
import { DatePickerDirective } from './directives/date-picker.directive';
// Component
import { ControlMessageComponent } from './components/control-message/control-message.component';
import { FormMessageComponent } from './components/form-message/form-message.component';
import { TinyMceComponent } from './components/tiny-mce/tiny-mce.component';

@NgModule({
	declarations: [
		SortPipe,
		DatePickerDirective,
		ControlMessageComponent,
		FormMessageComponent,
		TinyMceComponent
	],
	imports: [
		CommonModule
	],
	providers: [],
	bootstrap: [],
	exports: [
		SortPipe,
		DatePickerDirective,
		DatePickerDirective,
		ControlMessageComponent,
		FormMessageComponent,
		TinyMceComponent
	]
})
export class CoreModule { }
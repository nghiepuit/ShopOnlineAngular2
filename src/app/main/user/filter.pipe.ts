import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	transform(value: any, ...args): any {
		if(value) {
			return value;
		} else {
			return '';
		}
	}
}
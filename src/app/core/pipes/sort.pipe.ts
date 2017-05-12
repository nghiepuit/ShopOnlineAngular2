import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort'
})
export class SortPipe implements PipeTransform {

	transform(arr: any[], key: string, value: number): any {
		if (key) {
			arr.sort((a, b) => {
				if ((value > 0 && a[key] > b[key]) || (value < 0 && a[key] < b[key]))
					return 1;
				return -1;
			})
		}
		return arr;
	}

}

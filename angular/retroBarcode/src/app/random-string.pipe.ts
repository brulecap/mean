import { Pipe, PipeTransform } from '@angular/core';
/*
	
*/
@Pipe({name: 'randomString'})
export class RandomStringPipe implements PipeTransform {
	transform(arrayofStrings: Array<string>): string {
		let randomRange = arrayofStrings.length;
		let randomIndex = Math.floor(Math.random()*randomRange);
		return arrayofStrings[randomIndex];
	}
}
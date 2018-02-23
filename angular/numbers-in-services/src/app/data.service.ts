import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
	sequence1: number[] = [1];
	sequence2: number[] = [];
	difference: number = 0;
	reducer = (accumulator, currentValue) => accumulator + currentValue;

	constructor() { }

	retrieveSequence1(): number[] {
		return this.sequence1;
	}

	retrieveSequence2(): number[] {
		return this.sequence2;
	}
	/*
		Generate sequence.
		Parameters:
			sequence - reference to sequence to generate(sequence1 or sequence2)
			length - Yep, length of sequence
			max - max num in sequence minus 1(note use of floor)
	*/
	generateSequence(sequence:number[], length:number, max:number) {
		// Clear old sequence. I tried sequence = []; but did not work. Losing reference?
		let index = sequence.length;
		for (let i=0;i<index;i++) {
			sequence.pop();
		}
		// Create new sequence.
		for (let i=0;i<length;i++) {
			sequence.push(Math.floor(Math.random()*max));
		}
	}

	retrieveDifference(): number {
		return this.sequence1.reduce(this.reducer) - this.sequence2.reduce(this.reducer);
	}
}

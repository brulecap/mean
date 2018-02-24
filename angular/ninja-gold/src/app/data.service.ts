import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
	history: Array<string> = [];
	buildings: Array<any> = [{name:"Farm", earns:{min:2,max:5}},
							{name:"Cave", earns:{min:5,max:10}},
							{name:"Casino", earns:{min:-100,max:100}},
							{name:"House", earns:{min:7,max:15}}]

	constructor() { }

	addHistory(history: string) {
		this.history.unshift(history);
	}

	retrieveHistory() {
		return this.history;
	}

	retrieveBuildings() {
		return this.buildings;
	}
}

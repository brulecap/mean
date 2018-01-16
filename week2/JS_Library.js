// Returns if a value is really a number
function isNumber (value) {
	return typeof value === 'number' && isFinite(value);
}
// Returns if a value is an array
function isArray (value) {
	return value && typeof value === 'object' && value.constructor === Array;
}
// Returns if a value is a string
function isString (value) {
	return typeof value === 'string' || value instanceof String;
}
// Returns if a value is a function
function isFunction (value) {
	return typeof value === 'function';
}
// Returns if a value is undefined
function isUndefined (value) {
return typeof value === 'undefined';
}
// Returns if a value is defined
function isDefined(value) {
	return typeof value !== 'undefined' && value !== null;
}
var _ = {
	// Produces a new array of values by mapping each value in list(l) through a 
	// transformation function(mapFunction).
	// Array will be empty if list is not a list or mapFunction us not a function.
	// Note:
	//		http://underscorejs.org/ had 2 examples. One with a list and one with
	//		object. I have not come up with a good way to determine if an object is
	//		is iterable. Symbol.iterator comes back as undefined in the object case.
	//		I assume that one of the objects up its prototype chain has that property
	//		but not sure how to check ATT. So I will do a try catch...
	//		Also seems to be something I am missing. In the object example mapFunction
	//		would accept 2 parameters(num and key). I am not sure why key is needed
	//		and as a result I am wondering if I am fully comprehending the problem.
	map: function(list, mapFunction) {
		let retVal = [];
		try {
			if (isFunction(mapFunction)) {
				let index = 0;
				for (var key in list) {
					retVal[index++] = mapFunction(list[key]);
				}
			}
		} catch(err) {
			console.log("Map error: "  + err.message);
		}
		return(retVal);
	},
	// Reduces a list(list) into a single value using a specified function(reduceFunction).
	// Please note: If third parameter memo is undefined, then the reduction starts with the
	// second item in the list and memo is assigned the first item on the list.
	// Example:
	//		list = [1,2,3]; f = return memo-num;
	//		If memo = 0, then reduce will produce -6 => =0-1-2-3
	//		If memo is undefined, then reduce will produce -4 => 1-2-3 
	// Array will be empty if there are no values returning true OR l is not a list or
	// f is not a function.
	reduce: function(list, reduceFunction, memo) {
		if (isArray(list) && isFunction(reduceFunction)) {
			let start = 0;
			var retVal;
			if (isUndefined(memo)) {
				start = 1;
				retVal = list[0];
			} else {
				retVal = memo;
			}
			for (let i=start;i<list.length;i++) {
				retVal = reduceFunction(retVal, list[i]);
			}
		}
		return(retVal);
	},
	// Iterates through each value in a list(list) and returns the first value that passes
	// a truth test when run through the function(filterFunction). When a value is found that
	// passes this test the iterations will stop. The _.filter() function is used passing
	// a breakOnFind of true.
	// If no values are found OR list is not a list or filterFunction is not a function
	// undefined will be returned(No return statement).
	find: function(list, filterFunction) {
		let retVal = _.filter(list,  filterFunction, true);
		if (isArray(retVal) && (retVal.length > 0) && isDefined(retVal[0])) {
			return retVal[0];
		}
	},
	// Iterates through each value in a list(list), returning an array of all the values 
	// in list that return true when run through function(filterFunction).
	// Array will be empty if there are no values returning true OR list is not a list or
	// filterFunction is not a function.
	filter: function(list, filterFunction, breakOnFind=false) {
		let retVal = [];
		if (isArray(list) && isFunction(filterFunction)) {
			for (let i=0;i<list.length;i++) {
				if (filterFunction(list[i])) {
					retVal.push(list[i]);
					if (breakOnFind) { break;}
				}
			}
		}
		return(retVal);
	},
	// Iterates through each value in a list(list), returning an array of all the values 
	// in list that return false(opposite of filter) when run through function(filterFunction).
	// Array will be empty if there are no values returning false OR list is not a list or
	// filterFunction is not a function.
	reject: function(list, filterFunction) {
		let retVal = [];
		if (isArray(list) && isFunction(filterFunction)) {
			for (let i=0;i<list.length;i++) {
				if (!filterFunction(list[i])) {
					retVal.push(list[i]);
				}
			}
		}
		return(retVal);
	},
	// Returns the first n values of a list(list). If n = 1 returns the first value. If
	// n > 1, returns a list of the first n values. 
	// Array will be empty if there are no values returning false OR list is not a list or
	// filterFunction is not a function.
	first: function(list, n=1) {
		let retVal = [];
		if (isArray(list)) {
			for (let i=0;i<n;i++) {
				if (n === 1) {
					return list[i];
				} else {
					retVal.push(list[i]);
				}
			}
		}
		return retVal;
	}
}

let evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log("filter: " + evens);
let num = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log("find: " + num);
let num1 = _.find([1, 3, 5], function(num){ return num % 2 == 0; });
console.log("find: " + num1);
let odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
console.log("reject: " + odds);
var mapped = _.map([1, 2, 3, 4, 5, 6], function(num){  return num * 3;  });
console.log("map: " + mapped);
mapped = _.map({'one':1, 'two':2,'three':3, 'four':4, 'five':5, 'six':6}, function(num){  return num * 3;  });
console.log("map: " + mapped);
let reduced = _.reduce([1, 2, 3], function(memo,num){ return memo-num; },0);
console.log("reduce: " + reduced);
reduced = _.reduce([1, 2, 3], function(memo,num){ return memo-num; });
console.log("reduce: " + reduced);
let sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 100);
console.log("reduce: " + sum);
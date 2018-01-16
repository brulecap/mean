// This function is an example of closure and one of the powerful things we can do with that.
// It will produce the next Fibonacci with each call as long as the variable, fibCounter, in the example
// below, contains the fib function.
function fib() {
	// These are the variables that are scoped to the fib function.
	let n = 0;
	let nNext = 1;
	// This the inner function. Not the scope of n nd nNext is part of
	// the fib function.
	function nacci() {
		console.log(nNext);
		let temp = n;
		n = nNext;
		nNext += temp;
	}
	return nacci
}
let fibCounter = fib();
fibCounter() // should console.log "1"
fibCounter() // should console.log "1"
fibCounter() // should console.log "2"
fibCounter() // should console.log "3"
fibCounter() // should console.log "5"
fibCounter() // should console.log "8"
module.exports = function (){
	return {
		add: function(num1, num2) { 
			return (num1 + num2); 
		},
		multiply: function(num1, num2) {
			return (num1 * num2); 
		},
		square: function(num) {
			return (num * num); 
		},
		// Returns a randon integer between num1(inclusive)
		// and num2(exclusive).
		random: function(num1, num2) {
			return Math.floor(Math.random(num1,num2) * (num2 - num1) + num1);
		}
	}
};
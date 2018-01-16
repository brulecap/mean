function Ninja(name) {
	var speed =3;
	var strength = 3;
	const isNinja = function(check) {
		if ((typeof(check) === "object") && (check instanceof Ninja)) {
			return true;
		}
		return false;
	};
	const swapHealth = function(to, from, amount) {
		if (isNinja(to) && isNinja(from)) {
			to.health += amount;
			from.health -= amount;
		}
	};

	this.name = name;
	this.health = 100;
	this.sayName = function() {
		console.log("My ninja name is " + this.name + "!");
		return this;
	};
	this.showStats = function() {
		console.log("Name: " + this.name + ", Health: " + this.health + ", Speed: " + speed + ", Strength: " + strength);
		return this;
	};
	this.drinkSake = function() {
		console.log("I like sake!");
		this.health += 10;
		return this;
	};
	this.punch = function(who) {
		if (isNinja(who)) {
			swapHealth(this, who, 5);
			console.log(who.name + " was punched by " + this.name + " and lost 5 Health!");
		}
		return this;
	};
	this.kick = function(who) {
		if (isNinja(who)) {
			swapHealth(this, who, 15);
			console.log(who.name + " was kicked by " + this.name + " and lost 15 Health!");
		}
		return this;
	};
};

//const ninja1 = new Ninja("Hyabusa");
//ninja1.sayName();
//ninja1.showStats();
//ninja1.drinkSake();
//ninja1.showStats();
const blueNinja = new Ninja("Goemon");
const redNinja = new Ninja("Bill Gates");
blueNinja.showStats();
redNinja.showStats();
redNinja.punch(blueNinja);
blueNinja.showStats();
redNinja.showStats();
blueNinja.kick(redNinja);
blueNinja.showStats();
redNinja.showStats();
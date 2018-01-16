class Ninja {
	constructor(name, health=100, speed=3, strength=3) {
		this.name = name;
		this.health = health;
		this._speed = speed;
		this._strength = strength;
	}
	sayName() {
		console.log("My ninja name is " + this.name + "!");
	}
	showStats() {
		console.log("Name: " + this.name + ", Health: " + this.health + ", Speed: " + this._speed + ", Strength: " + this._strength);
	}
	drinkSake() {
		console.log("I like sake!");
		this.health += 10;
	}
}

class Sensei extends Ninja {
	constructor(name) {
		super(name, 200, 10, 10);
		this.wisdom = 10;
	}
	speakWisdom() {
		console.log("What one programmer can do in one month, two programmers can do in two months.");
	}
}

const ninja1 = new Ninja("Hyabusa");
ninja1.sayName();
ninja1.showStats();
const superSensei = new Sensei("Master Splinter");
superSensei.sayName();
superSensei.speakWisdom();
superSensei.showStats();
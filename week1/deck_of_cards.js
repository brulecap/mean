class Deck {
	constructor() {
		this.suits = ["hearts", "diamonds", "clubs", "spades"];
		this.ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
		this.deck = [];
		this.reset()
	}

	makeDeck() {
		for( let i = 0; i < this.suits.length; i++ ) {
			//and for each rank
			for(let j = 0; j < this.ranks.length; j++ ) {
				//make a card
				let card = {};
				card.suit = this.suits[i];
				card.rank = this.ranks[j];
				this.deck.push(card);
			}
		}
	}

	shuffle() {
		// This function will perform a shuffle on the current deck. i.e. Cards dealt
		// will not be part of the shuffle.
		// Start at the back of the deck(index deck.length-1) and swap that card with
		// another random card(could even be itself). Then swap the next to last card
		// with another card. Rinse and repeat until we reach the head(0 index) of the
		// array. This is an O(n) operation.
		let m = this.deck.length;
		var t, i;
		// While there remain elements to shuffle…
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);
			// And swap it with the current element.
			t = this.deck[m];
			this.deck[m] = this.deck[i];
			this.deck[i] = t;
		}

	}

	reset() {
		// Create a new deck and shuffle.
		this.makeDeck();
		this.shuffle();
	}


	shuffle2() {
		// This shuffle will swap places of 2 random cards 1000 times. This too is an
		// O(n) operations, albeit approxiamtely O(20n) in the case of a deck of 52
		// cards.  
		for (let i=0;i<1000;i++) {
			let location1 = Math.floor(Math.random() * this.deck.length);
			let location2 = Math.floor(Math.random() * this.deck.length);
			let temp = this.deck[location1]
			this.deck[location1] = this.deck[location2];
			this.deck[location2] = temp;
		}
	}

	deal() {
		let cardIndex = Math.floor(Math.random() * this.deck.length);
		let card = this.deck[cardIndex];
		this.deck.splice(cardIndex, 1);
		return card;
	}
}

class Player {
	constructor(name) {
		this.name = name;
		this.hand = [];
	}

	draw(deck) {
		this.hand.push(deck.deal());
		return this;
	}

	discard(index) {
		if ((index >= 0) && (index < this.hand.length)) {
			this.hand.splice(index,1);
		}
	}
}

const deck = new Deck();
const player = new Player("Bruce");
player.draw(deck).draw(deck).draw(deck);
console.log(player);
let discardIndex = player.hand.length - 1;
player.discard(discardIndex);
console.log(player);
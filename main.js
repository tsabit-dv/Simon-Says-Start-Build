const startBtn = document.querySelector('#start');
const blue = document.querySelector('#blue');
const red = document.querySelector('#red');
const purple = document.querySelector('#purple');
const green = document.querySelector('#green');

class Game {
	constructor() {
		this.lastLevel = 1;
		this.colors = {
			blue,
			red,
			purple,
			green,
		};
		this.sequence = [];
		this.toggleBtn();
		this.startGame();
		this.generateSequence();
		setTimeout(() => this.nextLevel(), 450);
	}

	toggleBtn() {
		startBtn.classList.toggle('hide');
	}

	startGame() {
		this.level = 1;
		this.subLevel = 0;
	}

	nextLevel() {
		this.subLevel = 0;
		this.iluminateSequence();
		this.setListeners();
	}

	generateSequence() {
		this.sequence = new Array(this.lastLevel)
			.fill(0)
			.map(n => Math.floor(Math.random() * (5 - 1) + 1));
	}

	iluminateSequence() {
		for (let i = 0; i < this.level; i++) {
			const color = this.sequenceToColors(this.sequence[i]);
			setTimeout(() => this.iluminate(color), 1000 * i);
		}
	}

	iluminate(color) {
		color.classList.add('light');
		setTimeout(() => color.classList.remove('light'), 550);
	}

	removeListeners() {
		this.colors.blue.removeEventListener('click', this.pickColor);
		this.colors.red.removeEventListener('click', this.pickColor);
		this.colors.purple.removeEventListener('click', this.pickColor);
		this.colors.green.removeEventListener('click', this.pickColor);
	}

	setListeners() {
		this.colors.blue.addEventListener('click', this.pickColor);
		this.colors.red.addEventListener('click', this.pickColor);
		this.colors.purple.addEventListener('click', this.pickColor);
		this.colors.green.addEventListener('click', this.pickColor);
	}

	pickColor = ev => {
		const colorName = ev.target.id;
		const colorSequence = this.colorToSequence(colorName);
		this.iluminate(this.colors[colorName]);

		if (colorSequence === this.sequence[this.subLevel]) {
			this.subLevel++;

			if (this.subLevel === this.level) {
				this.removeListeners();
				this.level++;

				if (this.level > this.lastLevel) {
					setTimeout(() => this.victory(), 700);
				} else {
					setTimeout(() => this.nextLevel(), 1500);
				}
			}
		} else {
			setTimeout(() => this.lose(), 700);
		}
	};

	victory() {
		Swal.fire('You Win!', 'Play Again!', 'success');
		setTimeout(() => this.toggleBtn(), 1000);
	}

	lose() {
		Swal.fire('You Lose!', 'Try Again you will do it the nex time!', 'error');
		setTimeout(() => {
			this.removeListeners();
			this.toggleBtn();
		}, 1000);
	}

	colorToSequence(colorName) {
		switch (colorName) {
			case 'red':
				return 1;
				break;
			case 'blue':
				return 2;
				break;
			case 'purple':
				return 3;
				break;
			case 'green':
				return 4;
				break;
		}
	}

	sequenceToColors(sequence) {
		switch (sequence) {
			case 1:
				return this.colors.red;
				break;
			case 2:
				return this.colors.blue;
				break;
			case 3:
				return this.colors.purple;
				break;
			case 4:
				return this.colors.green;
				break;
		}
	}
}

startBtn.addEventListener('click', () => {
	window.game = new Game();
});

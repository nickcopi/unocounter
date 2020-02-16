
let cardValues = [
	'0',
	'1',
	'1',
	'2',
	'2',
	'3',
	'3',
	'4',
	'4',
	'5',
	'5',
	'6',
	'6',
	'7',
	'7',
	'8',
	'8',
	'9',
	'9',
	'skip',
	'skip',
	'rev',
	'rev',
	'+2',
	'+2',
	'wild',
	'+4',

];
let cardColors = [
	'red',
	'yellow',
	'green',
	'blue',
];
let activeCards = [];

let activeColor;

let colorSelector;
let statsOverview;

function clickCard(e){
	this.parentElement.style.display = 'none';
	colorSelector.style.display = 'block';
	if(this.innerText === 'back') return;
	this.style.backgroundColor = 'gray';
	this.style.cursor = 'auto';
	this.removeEventListener('click',clickCard);
	activeCards[activeColor].forEach(card=>{
		if(card.value === this.innerText && card.enabled){
			card.enabled = false;
			this.innerText=` ${this.innerText} `;
			return;
		} 
	});
}

function clickColor(e){
	activeColor = this.alt;
	this.parentElement.style.display = 'none';
	document.getElementsByClassName('colorHolder')[activeColor].style.display = "block";
}

function clickStats(e){
	colorSelector.style.display = 'none';
	statsOverview.style.innerHTML = '';
	statsOverview.style.display = 'block';
	for(let i = 0; i < activeCards.length;i++){
		for(let j = 0; j < activeCards[i].length; j++){
			let smallCard = document.createElement('div');
			smallCard.className = 'smallCard';
			smallCard.innerText = activeCards[i][j].value;
			smallCard.style.backgroundColor = activeCards[i][j].enabled?cardColors[i]:'gray';
			statsOverview.appendChild(smallCard);
		}
	}

}
function statsOverviewClicked(e){
	this.innerHTML = '';
	this.style.display = 'none';
	colorSelector.style.display = 'block';
}

let drawCards = ()=>{
	colorSelector = document.getElementById('colorSelector');
	statsOverview = document.getElementById('statsOverview');
	cardColors.forEach(color=>{
		newBigColor = document.createElement('div');
		newBigColor.innerText = color;
		newBigColor.style.backgroundColor = color;
		newBigColor.alt = cardColors.indexOf(color);
		newBigColor.className = 'bigCard';
		newBigColor.addEventListener('click',clickColor);
		colorSelector.appendChild(newBigColor);
		newColorHolder = document.createElement('div');
		newColorHolder.style.display = 'none';
		newColorHolder.className = 'colorHolder';
		document.body.appendChild(newColorHolder);
		activeCards.push(new Array());
		/*make back button*/
		let backButton = document.createElement('div');
		backButton.className = 'card';
		backButton.innerText = 'back'; 
		backButton.style.backgroundColor = 'gray';
		backButton.addEventListener('click',clickCard);
		newColorHolder.appendChild(backButton);
		/**/
		cardValues.forEach(value=>{
			activeCards[activeCards.length-1].push(
				{
					value,
					enabled: true
				});
			newCard = document.createElement('div');
			newCard.innerText = value;
			newCard.style.backgroundColor = color;
			newCard.className = 'card';
			newCard.addEventListener('click',clickCard);
			newColorHolder.appendChild(newCard);
		});

	});
	statsButton = document.createElement('div');
	statsButton.innerText = 'Stats';
	statsButton.className = 'statsButton';
	statsButton.addEventListener('click',clickStats);
	colorSelector.appendChild(statsButton);
	statsOverview.addEventListener('click',statsOverviewClicked);
}

window.addEventListener('load',()=>{
	drawCards();
});
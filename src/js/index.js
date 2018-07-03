import '../styles/index.scss';

const display = document.getElementsByClassName('display')[0],
	  numbers = document.getElementsByClassName('number'),
      actions = document.getElementsByClassName('action');

let expression_accumulator = '',
    last_input = '',
	last_action = '';




const mathParser = (accumulator, last_action, last_input) => {
	let result;
	if (!last_input) return accumulator;
	switch(last_action) {
		case '-': 
			result = ((Number(accumulator) * 1e10) - (Number(last_input) * 1e10)) / 1e10;
			break;
		case '+': 
			result = ((Number(accumulator) * 1e10) + (Number(last_input) * 1e10)) / 1e10;
			break;
		case '/': 
			result = Number(accumulator) / Number(last_input);
			break;
		case '*': 
			result = Number(accumulator) * Number(last_input);
			break;
		default :
			result = accumulator;
	}	
	return result;
}

const equalButton = () => {
	const last_number = display.lastChild.innerHTML ? display.lastChild.innerHTML.trim() : '';
	let last_line = display.lastChild;
	if (last_line.innerHTML.trim().match(/\=/)) return;
	
	last_input = last_number;	
	expression_accumulator = mathParser(expression_accumulator, last_action, last_input);	
	
	last_line = document.createElement('p');	
	
	last_line.classList.add('display-line-answer');
	last_line.classList.add('col-12')
	
	last_line.innerHTML = isNaN(expression_accumulator) ? 'Your expression wasn\'t correct' : `=${expression_accumulator}`;	
	display.appendChild(last_line);
}

const clearDisplay = () => {
	while (display.lastChild) {
		display.removeChild(display.lastChild)
	}
	display.appendChild(document.createTextNode(''))
	expression_accumulator = '';	
	last_input = '';
}

const toggleTheme = e => {
	let text = e.target.innerHTML; 
	let new_text = text.slice(24).match(/light/) ? 'dark' : 'light';
	e.target.innerHTML = text.slice(0, 24) + new_text;
	if (new_text === 'dark')
		document.querySelector('.wrapper').classList.add('theme-dark');
	else document.querySelector('.wrapper').classList.remove('theme-dark');
}




Array.from(numbers).forEach((numberButton, index) => {
	const number = numberButton.innerHTML,
		numberFunction = () => {
			let last_line = display.lastChild;

			if (last_line.nodeType != 1 || last_line.innerHTML.match(/[^0-9.]/)) {
				if (last_line.innerHTML && last_line.innerHTML.match(/[\*\-\+\/]/)) {				
					last_action = last_line.innerHTML
				}
				last_line = document.createElement('p');	
			}

			last_line.classList.add('col-12')

			let current = last_line.innerHTML;
			const alreadyHasDot = current.match(/\./) && number.match(/\./)	
			const new_number = alreadyHasDot ? current : current.trim() + number.trim();	
			last_line.innerHTML = new_number;		
			display.appendChild(last_line);	
		}
	
	numberButton.addEventListener('click', e => {
		numberFunction();
	})	
})



Array.from(actions).forEach((actionButton, index) => {
	const action = actionButton.innerHTML.trim(),	
		  actionFunction = () => {
			const odd    = display.childElementCount % 2 === 0;
				  
			let last_line = display.lastChild;	
			if (last_line.innerHTML && last_line.innerHTML.match(/[\*\-\+\/\=]/)) {
				last_line.innerHTML = action;
				last_action = action;
				return;
			}
			
			expression_accumulator == '' ? expression_accumulator = last_line.innerHTML : last_input = last_line.innerHTML;
			expression_accumulator = mathParser(expression_accumulator, last_action, last_input);
			
					
			last_line = document.createElement('p')
			last_line.classList.add('display-line-action');
			last_line.classList.add('col-12')
			last_line.innerHTML = action;
			display.appendChild(last_line)
		  }	
	
	actionButton.addEventListener('click', () => {
		actionFunction()
	}); 	
})




document.getElementsByClassName('super-action-equal')[0].addEventListener('click', equalButton);
document.getElementsByClassName('super-action-clear')[0].addEventListener('click', clearDisplay);
document.getElementsByClassName('theme-button')[0].addEventListener('click', toggleTheme);




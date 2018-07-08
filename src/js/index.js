import '../styles/index.scss';
import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './components/math_parsing.js';
import { Calculator } from './components/calculator_class.js';
import { toggleTheme, dotTerminator } from './components/helpers.js';




const display = document.getElementsByClassName('display')[0];
let calculator = new Calculator();


const numbers = document.getElementsByClassName('number'),
	  action_buttons = document.getElementsByClassName('action'),
	  actions_special_buttons = document.getElementsByClassName('action-special'),
	  actions_special_unary_buttons = document.getElementsByClassName('action-special-unary');  
	  


const clearDisplay = () => {
	while (display.lastChild) {
		display.removeChild(display.lastChild)
	}
		
	calculator = new Calculator();
}
	  

	  
const resultButton = () => {	
	if (calculator.action && calculator.operand) {		
		calculator.addOperation();
		calculator.produceResult();
	}
			
	let result = document.createElement('p');
	result.classList.add('accumulator');		
	result.innerHTML = calculator.accumulator;	
	
	display.appendChild(result);
	calculator = new Calculator(calculator.accumulator);
}

const actionFunction = action => {
	
	if (!calculator.accumulator) {
		return
	}
				
	if  (display.lastChild && display.lastChild.className.match(/operation/)) {
		display.lastChild.innerHTML = action;
		calculator.setAction(action);
		return;
	}
	
	if (calculator.action && calculator.operand) {
		calculator.addOperation();
		calculator.clearOperand();
	}		
	calculator.setAction(action);
	let new_action = document.createElement('p');
	new_action.classList.add('operation');		
	new_action.innerHTML = action;
	display.appendChild(new_action);
}

const toggleMode = () => {
	const actions_left = document.getElementsByClassName('actions')[0];
	const actions_right = document.getElementsByClassName('actions-special')[0];

	if (actions_left.className.match('col-4')) {
		
		actions_left.classList.remove('col-4');
		actions_left.classList.add('col-2');
		setTimeout(() => {				
			actions_right.classList.remove('hidden');			
			actions_right.classList.remove('col-1');
			actions_right.classList.add('col-2');
		}, 800)	
	}
	else {			
		actions_right.classList.add('hidden');	
		actions_left.classList.remove('col-2');
		actions_left.classList.add('col-4');	
				
		actions_right.classList.remove('col-2');
		actions_right.classList.add('col-1');
	}
}

const init_listeners = () => {

	Array.from(numbers).forEach((numberButton, index) => {
		const number = numberButton.innerHTML.trim();
		
		numberButton.addEventListener('click', e => {
			
			if (calculator.action) {	
				if (calculator.operand)	{				
					calculator.concatOperand(number);		
					calculator.operand = dotTerminator(calculator.operand);			
					let last_operand = Array.from(document.getElementsByClassName('operand')).reverse()[0];
					last_operand.innerHTML = calculator.operand;				
				}
				else {
					let new_operand = document.createElement('p');
					new_operand.classList.add('operand');	
					calculator.concatOperand(number);			
					calculator.operand = dotTerminator(calculator.operand);			
					new_operand.innerHTML = calculator.operand;			
					display.appendChild(new_operand);						
				}
				
			}
			else {
				if (calculator.accumulator) {					
					calculator.concatAccumulator(number);	
					calculator.accumulator = dotTerminator(calculator.accumulator);	
					let last_accumulator = Array.from(document.getElementsByClassName('accumulator')).reverse()[0];
					last_accumulator.innerHTML = calculator.accumulator;						
				}
				else {
					let new_accumulator = document.createElement('p');
					new_accumulator.classList.add('accumulator');
					calculator.concatAccumulator(number);	
					calculator.accumulator = dotTerminator(calculator.accumulator);	
					new_accumulator.innerHTML = calculator.accumulator;			
					display.appendChild(new_accumulator);	
				}
			}
		})
	})
	
	Array.from(action_buttons).forEach((actionButton, index) => {
		const action = actionButton.innerHTML.trim();
		
		actionButton.addEventListener('click', e => {
			actionFunction(action)
		})
	})	
	
	Array.from(actions_special_buttons).forEach((actionButton, index) => {
		const action = actionButton.innerHTML.trim();
		
		actionButton.addEventListener('click', e => {	
			actionFunction(action)
		})
	})
	
	Array.from(actions_special_unary_buttons).forEach((actionButton, index) => {
		const action = actionButton.innerHTML.trim();
		
		actionButton.addEventListener('click', e => {
			calculator.directMutation(action, calculator);
			calculator.operand ? Array.from(document.getElementsByClassName('operand')).reverse()[0].innerHTML = calculator.operand :
			Array.from(document.getElementsByClassName('accumulator')).reverse()[0].innerHTML = calculator.accumulator;
		})
	})
	
	
	
	document.getElementsByClassName('super-action-equal')[0].addEventListener('click', resultButton);
	document.getElementsByClassName('super-action-clear')[0].addEventListener('click', clearDisplay);
	document.getElementsByClassName('switch')[0].addEventListener('click', e => {
		
		toggleTheme(e.target.checked);
	});
	
	document.getElementsByClassName('super-action-toggle')[0].addEventListener('click', e => {
		toggleMode();
	})
	
	document.getElementsByClassName('super-action-pop')[0].addEventListener('click', e => {
		calculator.pop();
		calculator.operand ? Array.from(document.getElementsByClassName('operand')).reverse()[0].innerHTML = calculator.operand :
		Array.from(document.getElementsByClassName('accumulator')).reverse()[0].innerHTML = calculator.accumulator;
	});
}


const init_render = () => {	
	const regular_actions = math_types.slice(0, 4);
	const numbers = document.getElementsByClassName('numbers')[0];
	const special_actions = math_types.slice(4),
		  special_actions_unary = unary_math_types.slice(0, unary_math_types.length - 1),	
		  special_actions_div = document.getElementsByClassName('actions-special')[0],
		  regular_actions_div = document.getElementsByClassName('actions')[0];
	
	for (let row = 0; row < 4; row++) {
		let new_row = document.createElement('div');		
		new_row.classList.add('row');
		for (let cell = 0; cell < 3; cell++) {
			let new_button = document.createElement('button');	
			new_button.classList.add('col-3');		
			if (row < 3) {
				new_button.innerHTML = (row * 3) + cell + 1;
				new_button.classList.add('number');	
			}
			else {
				switch(cell) {
					case 0: 
						new_button.innerHTML = 0; 
						new_button.classList.add('number');	
						break;
					case 1:
						new_button.innerHTML = '.';						
						new_button.classList.add('number');	
						break;
					case 2:
						new_button.innerHTML = '+/-';
						new_button.classList.add('action-special-unary');	
						break;
				}
			}
			
			new_row.appendChild(new_button);
		}
		numbers.appendChild(new_row);
	}
	
	regular_actions.forEach(action => {
		let new_action = document.createElement('button');
		new_action.classList.add('col-12');	
		new_action.classList.add('action');			
		new_action.innerHTML = action.value;
		regular_actions_div.appendChild(new_action)
	})
	
	special_actions.forEach(action => {
		let new_action = document.createElement('button');
		new_action.classList.add('col-6');	
		new_action.classList.add('action-special');			
		new_action.innerHTML = action.value;	
		special_actions_div.appendChild(new_action)
		
	})
	
	special_actions_unary.forEach(action => {
		let new_action = document.createElement('button');
		new_action.classList.add('col-6');	
		new_action.classList.add('action-special-unary');			
		new_action.innerHTML = action.value;	
		special_actions_div.appendChild(new_action)
		
	})
	
	
}

init_render();
init_listeners();

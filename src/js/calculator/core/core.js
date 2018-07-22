import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './math_parsing.js';
import { Calculator } from '../index.js';
import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction } from '../helpers';
import { resultButton, clearDisplay, actionFunction, toggleMode, numberFunction } from './listeners.js';


// Initializing listeners function
const init_listeners = (calculator, index) => {

	const display = document.getElementsByClassName('display')[index];

	const numbers = document.getElementsByClassName(`number-${index}`),
		  action_buttons = document.getElementsByClassName(`action-${index}`),
		  actions_special_buttons = document.getElementsByClassName(`action-special-${index}`),
		  actions_special_unary_buttons = document.getElementsByClassName(`action-special-unary-${index}`);  


	// Number buttons listeners
	Array.from(numbers).forEach(numberButton => {
		const number = numberButton.innerHTML.trim();
		
		numberButton.addEventListener('click', e => {
			numberFunction(number, calculator, display, index);
		})
	})
	
	// Operations buttons listeners
	Array.from(action_buttons).forEach((actionButton, index) => {
		const action = actionButton.innerHTML.trim();
		
		actionButton.addEventListener('click', e => {
			actionFunction(action, calculator, display)
		})
	})	
	
	// Special buttons listeners
	Array.from(actions_special_buttons).forEach((actionButton, index) => {
		const action = actionButton.innerHTML.trim();
		
		actionButton.addEventListener('click', e => {	
			actionFunction(action, calculator, display)
		})
	})
	
	// Unary operators buttons listeners
	Array.from(actions_special_unary_buttons).forEach(actionButton => {
		const action = actionButton.innerHTML.trim();
		
		actionButton.addEventListener('click', e => {
			const last_operand = Array.from(document.getElementsByClassName(`operand-${index}`)).reverse()[0],
				  last_accumulator = Array.from(document.getElementsByClassName(`accumulator-${index}`)).reverse()[0];
				  
			calculator.directMutation(action, calculator);
			calculator.operand ? 
			last_operand.innerHTML = `${action}(${last_operand.innerHTML})` :
			last_accumulator.innerHTML = calculator.accumulator;
		})
	})
	
	
	// Result button listener
	document.getElementsByClassName('super-action-equal')[index].addEventListener('click', e => {
		calculator = resultButton(calculator, display, index)
	});
	
	// Clear button listener
	document.getElementsByClassName('super-action-clear')[index].addEventListener('click', e => {
		calculator = clearDisplay(display)
	});
	
	// Toggle calculator mode button listener
	document.getElementsByClassName('super-action-toggle')[index].addEventListener('click', e => {
		toggleMode(index, e);
	})	
	
	// Remove last character button listener
	document.getElementsByClassName('super-action-pop')[index].addEventListener('click', e => {
		calculator.pop();
		calculator.operand ? Array.from(document.getElementsByClassName(`operand-${index}`)).reverse()[0].innerHTML = calculator.operand :
		Array.from(document.getElementsByClassName(`accumulator-${index}`)).reverse()[0].innerHTML = calculator.accumulator;
	});
}



// Rendering calculator function
const init_render = index => {	
	// Calling math types
	const regular_actions = math_types.slice(0, 4).concat(unary_math_types[1]),
		  special_actions = math_types.slice(4),
		  special_actions_unary = unary_math_types.slice(0, 1).concat(unary_math_types.slice(2, unary_math_types.length - 1));
		  
		  
	// Initializing the main calculator body 
    const html_calc = elt('div',
		nodeWithClasses('div', '', 'display'),
		nodeWithClasses(elt('div', '',			
			nodeWithClasses('div', '', 'numbers', 'col-6'),
			nodeWithClasses('div', '', 'actions', 'col-4'),
			nodeWithClasses('div', '', 'actions-special', 'col-1', 'hidden'),
			nodeWithClasses(elt('div',
				nodeWithClasses(elt('div',
					nodeWithClasses('button', '<-', 'super-action-pop', 'col-2'),
					nodeWithClasses('button', 'ingineer off', 'super-action-toggle', 'col-2'),
					nodeWithClasses('button', 'clear', 'super-action-clear', 'col-2'),
					nodeWithClasses('button', '=', 'super-action-equal', 'col-2'),					
				), '', 'row', 'justify-content-center')
			), '', 'super-actions', 'col-12')
		), '', 'buttons', 'row'),		
    )	
	document.getElementsByClassName('main')[0].appendChild(nodeWithClasses(html_calc, '', `calc-${index}`));
	
	// Calling calculator's sections	
	const numbers = document.getElementsByClassName('numbers')[index],
		  regular_actions_div = document.getElementsByClassName('actions')[index],
		  special_actions_div = document.getElementsByClassName('actions-special')[index];
	
	// Rendering number buttons
	for (let row = 0; row < 4; row++) {
		let new_row = document.createElement('div');		
		new_row.classList.add('row');
		for (let cell = 0; cell < 3; cell++) {
			let new_button = document.createElement('button');	
			new_button.classList.add('col-3');		
			if (row < 3) {
				new_button.innerHTML = (row * 3) + cell + 1;
				nodeWithClasses(new_button, '', 'number', `number-${index}`);
			}
			else {
				switch(cell) {
					case 0: 
						new_button.innerHTML = 0; 
						nodeWithClasses(new_button, '', 'number', `number-${index}`);
						break;
					case 1:
						new_button.innerHTML = '.';						
						nodeWithClasses(new_button, '', 'number', `number-${index}`);	
						break;
					case 2:
						new_button.innerHTML = '+/-';
						nodeWithClasses(new_button, '', 'action-special-unary', `action-special-unary-${index}`);
						break;
				}
			}
			
			new_row.appendChild(new_button);
		}
		numbers.appendChild(new_row);
	}
	
	// Rendering action buttons
	regular_actions.forEach(action => {
		const className = action.value === '%' ? 'action-special-unary' : 'action';
		renderAction(action, regular_actions_div, 'col-6', `${className}-${index}`, className);	
	})
	
	special_actions.forEach(action => {
		renderAction(action, special_actions_div, 'col-6', `action-special-${index}`, 'action-special');	
		
	})
	
	special_actions_unary.forEach(action => {
		renderAction(action, special_actions_div, 'col-6', `action-special-unary-${index}`, 'action-special-unary');		
	})
	
	
}

export const calculators_init = (qty) => {
		
	 const calculators = [];

	// Initializing calculators array
	const init_calculators = (qty) => {
		for (let i = 0; i < qty; i++) {
			calculators[i] = new Calculator;
		}
	} 

	init_calculators(qty)

	// Rendering calculators and initializing their event listeners
	calculators.forEach((calc, index) => {
		init_render(index);
		init_listeners(calc, index);
	})	

	calculators.length > 1 ? calculators.forEach((calc, index) => { 
		document.getElementsByClassName(`calc-${index}`)[0].classList.add('col-6')
	}) : '';
}



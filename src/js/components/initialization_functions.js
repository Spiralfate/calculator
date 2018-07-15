import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './math_parsing.js';
import { Calculator } from './calculator_class.js';
import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction } from './helpers.js';
import { resultButton, clearDisplay, actionFunction, toggleMode } from './listener_functions.js';


// Initializing listeners function
export const init_listeners = (calculator, index) => {

	const display = document.getElementsByClassName('display')[index];

	const numbers = document.getElementsByClassName(`number-${index}`),
		  action_buttons = document.getElementsByClassName(`action-${index}`),
		  actions_special_buttons = document.getElementsByClassName(`action-special-${index}`),
		  actions_special_unary_buttons = document.getElementsByClassName(`action-special-unary-${index}`);  


	// Number buttons listeners
	Array.from(numbers).forEach(numberButton => {
		const number = numberButton.innerHTML.trim();
		
		numberButton.addEventListener('click', e => {
						
			if (calculator.action) {	
				if (calculator.operand)	{				
					calculator.concatOperand(number);		
					calculator.operand = dotTerminator(calculator.operand);			
					let last_operand = Array.from(document.getElementsByClassName(`operand-${index}`)).reverse()[0];
					last_operand.innerHTML = calculator.operand;				
				}
				else {
					let new_operand = nodeWithClasses('p', '', 'operand', `operand-${index}`);
					calculator.concatOperand(number);			
					calculator.operand = dotTerminator(calculator.operand);			
					new_operand.innerHTML = calculator.operand;			
					display.appendChild(new_operand);						
				}
				
			}
			else {
				if (calculator.accumulator) {				
					debugger;	
					calculator.concatAccumulator(number);	
					calculator.accumulator = dotTerminator(calculator.accumulator);	
					let last_accumulator = Array.from(document.getElementsByClassName(`accumulator-${index}`)).reverse()[0];
					last_accumulator.innerHTML = calculator.accumulator;						
				}
				else {
					let new_accumulator = nodeWithClasses('p', '', 'accumulator', `accumulator-${index}`);
					calculator.concatAccumulator(number);	
					calculator.accumulator = dotTerminator(calculator.accumulator);	
					new_accumulator.innerHTML = calculator.accumulator;			
					display.appendChild(new_accumulator);	
				}
			}
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
			calculator.directMutation(action, calculator);
			calculator.operand ? Array.from(document.getElementsByClassName(`operand-${index}`)).reverse()[0].innerHTML = calculator.operand :
			Array.from(document.getElementsByClassName(`accumulator-${index}`)).reverse()[0].innerHTML = calculator.accumulator;
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
		toggleMode(index);
	})	
	
	// Remove last character button listener
	document.getElementsByClassName('super-action-pop')[index].addEventListener('click', e => {
		calculator.pop();
		calculator.operand ? Array.from(document.getElementsByClassName('operand')).reverse()[0].innerHTML = calculator.operand :
		Array.from(document.getElementsByClassName('accumulator')).reverse()[0].innerHTML = calculator.accumulator;
	});
}

// Rendering calculator function
export const init_render = index => {	
	// Calling math types
	const regular_actions = math_types.slice(0, 4),
		  special_actions = math_types.slice(4),
		  special_actions_unary = unary_math_types.slice(0, unary_math_types.length - 1);
		  
		  
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
					nodeWithClasses('button', 'toggle calculator', 'super-action-toggle', 'col-2'),
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
		renderAction(action, regular_actions_div, 'col-6', `action-${index}`, 'action');	
	})
	
	special_actions.forEach(action => {
		renderAction(action, special_actions_div, 'col-6', `action-special-${index}`, 'action-special');	
		
	})
	
	special_actions_unary.forEach(action => {
		renderAction(action, special_actions_div, 'col-6', `action-special-unary-${index}`, 'action-special-unary');		
	})
	
	
}

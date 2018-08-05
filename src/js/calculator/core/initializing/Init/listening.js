import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction } from '../../../helpers';
import { resultButton, clearDisplay, actionFunction, toggleMode, numberFunction, diceButton } from '../../listeners.js';
import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from '../../math_parsing.js';

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
	
	// Dice button listener
	document.getElementsByClassName('super-action-dice')[index].addEventListener('click', e => {
		diceButton(calculator, display, index);
	})		
	
	// Remove last character button listener
	document.getElementsByClassName('super-action-pop')[index].addEventListener('click', e => {
		calculator.pop();
		calculator.operand ? Array.from(document.getElementsByClassName(`operand-${index}`)).reverse()[0].innerHTML = calculator.operand :
		Array.from(document.getElementsByClassName(`accumulator-${index}`)).reverse()[0].innerHTML = calculator.accumulator;
	});
}

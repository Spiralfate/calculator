import { Calculator } from './calculator_class.js';  
import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction } from './helpers.js';

// Result button function
export const resultButton = (calculator, display, index) => {	
	if (calculator.action && calculator.operand) {		
		calculator.addOperation();
		calculator.produceResult();
	}
			
	let result = nodeWithClasses('p', calculator.accumulator, 'accumulator', `accumulator-${index}`);
	
	display.appendChild(result);
	return new Calculator(calculator.accumulator);
}

// Clear display button function
export const clearDisplay = (display) => {
	while (display.lastChild) {
		display.removeChild(display.lastChild)
	}
		
	return new Calculator();
}
	  
// Actions buttons function
export const actionFunction = (action, calculator, display, index) => {
	
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
	let new_action = nodeWithClasses('p', action, 'operation' , `operation-${index}`);
	display.appendChild(new_action);
}


// Calculator mode toggling button function
export const toggleMode = (index) => {
	const actions_left = document.getElementsByClassName('actions')[index];
	const actions_right = document.getElementsByClassName('actions-special')[index];

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

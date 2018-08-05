import { Calculator } from '../index.js';  
import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction, fetchDice } from '../helpers';

// Number buttons function
export const numberFunction = (number, calculator, display, index) => {
    // Checks if any operarion was already been entered
	if (calculator.action) {			
		if (calculator.operand)	{		
			calculator.concatOperand(number);			
			calculator.operand = dotTerminator(calculator.operand);			
			let last_operand = Array.from(document.getElementsByClassName(`operand-${index}`)).reverse()[0];
			last_operand.innerHTML = calculator.operand;				
		}
		else {
			calculator.concatOperand(number);			
			calculator.operand = dotTerminator(calculator.operand);		
			let new_operand = nodeWithClasses('p', String(calculator.operand), 'operand', `operand-${index}`);	
			display.appendChild(new_operand);						
		}		
	}
	
	else {
		if (calculator.accumulator) {	
			calculator.concatAccumulator(number);	
			calculator.accumulator = dotTerminator(calculator.accumulator);	
			let last_accumulator = Array.from(document.getElementsByClassName(`accumulator-${index}`)).reverse()[0];
			last_accumulator.innerHTML = calculator.accumulator;						
		}
		else {
			calculator.concatAccumulator(number);	
			calculator.accumulator = dotTerminator(calculator.accumulator);	
			let new_accumulator = nodeWithClasses('p', String(calculator.accumulator), 'accumulator', `accumulator-${index}`);
			display.appendChild(new_accumulator);	
		}
	}
}

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
	
    // Declines if no initial value presents
	if (!calculator.accumulator) {
		return
	}
    
    // Rewrites the last operation if no additional operand was entered afterwards			
	if  (display.lastChild && display.lastChild.className.match(/operation/)) {
		display.lastChild.innerHTML = action;
		calculator.setAction(action);
		return;
	}
	// Proceeds to the operarions array if an action and an operand presents
	if (calculator.action && calculator.operand) {
		calculator.addOperation();
		calculator.clearOperand();
	}		
	calculator.setAction(action);
	let new_action = nodeWithClasses('p', action, 'operation' , `operation-${index}`);
	display.appendChild(new_action);
}


// Calculator mode toggling button function
export const toggleMode = (index, e) => {
	const actions_left = document.getElementsByClassName('actions')[index],
		actions_right = document.getElementsByClassName('actions-special')[index];
	
	
	e.target.innerHTML.match(/off/) ? e.target.innerHTML = 'ingineer on' : e.target.innerHTML = 'ingineer off'

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

// Dice request function 

export const diceButton = (calculator, display, index) => {
    Promise.resolve(fetchDice()).then(res => {
        numberFunction(res, calculator, display, index)
    }, err => alert(err))
}


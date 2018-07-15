import '../styles/index.scss';
import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './components/math_parsing.js';
import { Calculator } from './components/calculator_class.js';
import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction } from './components/helpers.js';
import { resultButton, clearDisplay, actionFunction, toggleMode } from './components/listener_functions.js';
import { init_listeners, init_render } from './components/initialization_functions.js';



const calculators = [];


// Initializing calculators array
const init_calculators = () => {
	const number_of_calcs = Math.round(Math.random() * 2 + 1);
	for (let i = 0; i < number_of_calcs; i++) {
		calculators[i] = new Calculator;
	}
} 

init_calculators()

// Rendering calculators and initializing their event listeners
calculators.forEach((calc, index) => {
	init_render(index);
	init_listeners(calc, index);
})


calculators.length > 1 ? calculators.forEach((calc, index) => { 
	document.getElementsByClassName(`calc-${index}`)[0].classList.add('col-6')
}) : '';

// Theme toggler
document.getElementsByClassName('switch')[0].addEventListener('click', e => {		
	toggleTheme(e.target.checked);
});	

import '../styles/index.scss';
import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './calculator/core/math_parsing.js';
import { Calculator } from './calculator';
import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction } from './calculator/helpers';
import { resultButton, clearDisplay, actionFunction, toggleMode } from './calculator/core/listeners.js';
import { calculators_init } from './calculator/core/core.js';
import config from './calculator/config';

// Registers the number of calc to render from config file
const { number_of_calculators } = config;


calculators_init(number_of_calculators)

// Theme toggler
document.getElementsByClassName('switch')[0].addEventListener('click', e => {		
	toggleTheme(e.target.checked);
});	

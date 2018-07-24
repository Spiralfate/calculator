import init_functions from './Init'
import { Calculator } from '../../index.js';


// Initializing document's main state 
export default class Init {
	
	// Could contain more variables 
	constructor () {
		this.calculators = []
	}
	
	// Fills the calculators array 
	init_calculators (qty) {
		for (let i = 0; i < qty; i++) {
			this.calculators[i] = new Calculator;
		}
	} 	
	
	// Renders calculators
	calcsRender () {			
		this.calculators.forEach((calc, index) => {
			init_functions.rendering(index)
		})	
		
		this.calculators.length > 1 ? this.calculators.forEach((calc, index) => { 
			document.getElementsByClassName(`calc-${index}`)[0].classList.add('col-6')
		}) : '';
	}
	// Maps the listeners to the calculators buttons
	calcsListen () {			
		this.calculators.forEach((calc, index) => {
			init_functions.listening(calc, index)
		})	
	}
}

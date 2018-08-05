import { toggleTheme, dotTerminator, elt, nodeWithClasses, renderAction } from '../../../helpers';
import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from '../../math_parsing.js';

// Rendering calculator function
export const init_render = index => {	
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
					nodeWithClasses('button', '<-', 'super-action-pop', 'col-1'),
					nodeWithClasses('button', 'ingineer off', 'super-action-toggle', 'col-2'),
					nodeWithClasses('button', 'clear', 'super-action-clear', 'col-1'),
					nodeWithClasses('button', 'dice', 'super-action-dice', 'col-1'),
					nodeWithClasses('button', '=', 'super-action-equal', 'col-1'),					
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

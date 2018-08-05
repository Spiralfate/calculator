import '../styles/index.scss';
import { core } from './calculator/core/core.js';
import { toggleTheme } from './calculator/helpers/'


const state = core();

// Theme toggler
document.getElementsByClassName('switch')[0].addEventListener('click', e => {		
	toggleTheme(e.target.checked);
});	

import Init from './initializing';
import config from '../config';

// Registers the number of calc to render from config file
const { number_of_calculators } = config;

// Instantiating the main state
export const core = () => {	
	const init = new Init();
	init.init_calculators(number_of_calculators);
	init.calcsRender();
	init.calcsListen();
	
	return init;
}










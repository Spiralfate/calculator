import { math_actions } from './math_actions.js';

export const math_types = [
	{code: 'substraction', value: '-', 	 perform: math_actions.substraction},
	{code: 'addition', value: '+', 		 perform: math_actions.addition},
	{code: 'division', value: '/', 		 perform: math_actions.division},
	{code: 'multiplication', value: '*', perform: math_actions.multiplication},
	{code: 'logarithm', value: 'log', 	 perform: math_actions.logarithm},
	{code: 'root', value: 'y√x',         perform: math_actions.root},
	{code: 'power', value: 'x^y',		 perform: math_actions.power},
]

export const unary_math_types = [	
	{code: 'factorial', value: 'n!',     perform: math_actions.factorial},
	{code: 'percentage', value: '%', 	 perform: math_actions.percentage},
	{code: 'square_root', value: '√', 	 perform: math_actions.square_root},
	{code: 'negative', value: '+/-', 	 perform: math_actions.negative}
]

export const extractPerform = (action_string, types) => {
	return types.filter(el => el.value == action_string)[0].perform
}

export const mathParser = (result, operation, types, calculator) => {
	const { action, operand } = operation;
	const action_perform = 	extractPerform(action, types);
	return action_perform(Number(result), Number(operand), calculator);
}

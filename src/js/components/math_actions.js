
import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './math_parsing.js';
export const math_actions = {
	
	substraction (accumulator, operand)	{
		return accumulator - operand
	},
	
	addition (accumulator, operand)	{
		return accumulator + operand
	},
	
	division (accumulator, operand)	{
		return accumulator / operand
	},
	
	multiplication (accumulator, operand)	{
		return accumulator * operand
	},
	
	square_root (accumulator)	{
		return Math.sqrt(accumulator)
	},
	
	factorial (accumulator, operand)	{
		return new Array(Math.floor(accumulator)).fill('').reduce((fact, cur, index) => {return fact * (index + 1)}, 1)
	},
	
	logarithm (accumulator, operand)	{
		return Math.log(accumulator) / Math.log(operand)
	},
	
	root (accumulator, operand)	{
		return accumulator ** (1 / operand)
	},
	
	power (accumulator, operand)	{
		return Math.pow(accumulator, operand)
	},
	
	percentage (accumulator, operand, calculator)	{
		let intermidiate_result = calculator.operations ? calculator.operations.reduce((result, operation, index, operations) => {
			return mathParser(result, operation, math_types);
		}, calculator.accumulator) : calculator.accumulator
		
		return operand * intermidiate_result / 100
	},
	
	negative (accumulator)	{
		return -accumulator
	}
}

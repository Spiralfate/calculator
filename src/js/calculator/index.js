import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './core/math_parsing.js';

export class Calculator {
	constructor(accumulator = '') {
		this.operations = [];
		this.accumulator = accumulator;
		this.operand = '';
		this.action = '';
	}
	
	addOperation () {
		const prev_operations = this.operations;
		this.operations = [
			...prev_operations,
			{
				operand: this.operand,
				action: this.action
			}
		]
	}
	
	// Clears operand prop
	clearOperand () {
		this.operand = '';
	}
	
	// Clears action prop
	clearAction () {		
		this.action = '';
	}
	
	// Clears operations array prop
	clearOperations () {
		this.operations = [];
	}
	
	// Adds argument to the operand prop as a string
	concatAccumulator (add) {
		this.accumulator = this.accumulator + add;
	}
	
	// Adds argument to the operand prop as a string
	concatOperand (add) {
		this.operand = this.operand + add;
	}
	
	// Removes last character from accumulator or operand prop whether the last one has a value
	pop () {	
		let subject;
		this.operand ? subject = String(this.operand) : subject = String(this.accumulator);
		subject = subject.slice(0, subject.length - 1);
		this.operand ? this.operand = subject : this.accumulator = subject;
	}
	setAction(action) {
		this.action = action;
	}
	
	// Makes a change on an operand or an accumulator bypassing the operations array
	directMutation(action, calculator) {
		let subject; 		
		if (this.operand) {
			subject = this.operand
			let intermidiate_result = mathParser(subject, { action, operand: this.operand }, unary_math_types, calculator);			
			this.operand = intermidiate_result;
		}
		else {			
			subject = this.accumulator
			let intermidiate_result = mathParser(subject, { action }, unary_math_types, calculator);			
			this.accumulator = intermidiate_result;
		}
	}	
	
	// Recursively writes the operations result to the accumulator prop
	produceResult() {
		this.accumulator = this.operations.reduce((result, operation, index, operations) => {
			return mathParser(result, operation, math_types);
		}, this.accumulator)
	}
}




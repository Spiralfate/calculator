import { unary_math_types, math_types, extractMathTypeOrPefrorm, mathParser } from './math_parsing.js';
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
	
	clearOperand () {
		this.operand = '';
	}
	
	clearAction () {		
		this.action = '';
	}
	
	clearOperations () {
		this.operations = [];
	}
	
	concatOperand (add) {
		this.operand = this.operand + add;
	}
	
	pop () {	
		let subject = this.operand ? this.operand : this.accumulator;
		subject = (subject).slice(0, subject.length - 1);
		this.operand ? this.operand = subject : this.accumulator = subject;
	}
	
	concatAccumulator (add) {
		this.accumulator = this.accumulator + add;
	}
	
	setAction(action) {
		this.action = action;
	}
	
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
	
	produceResult() {
		this.accumulator = this.operations.reduce((result, operation, index, operations) => {
			return mathParser(result, operation, math_types);
		}, this.accumulator)
	}
}




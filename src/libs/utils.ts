import { Rule } from '../types';
import { rules } from './rules';

export const parseRules = (validation: String) => {
	if (validation != undefined) {
		let result: Rule[] = [];
		let parsedValidation: String[] = [];
		validation.split('|').forEach((v) => parsedValidation.push(v.trim()));
		Object.keys(rules).forEach((k) => {
			if (parsedValidation.includes(k)) {
				result.push(rules[k]);
			}
		});
		return result;
	} else {
		return [];
	}
};

export const parseSelectOptions = (options: String) => {
	if (options != undefined) {
		let result: String[] = [];
		options.split(',').forEach((v) => result.push(v.trim()));
		return result;
	} else {
		return [];
	}
};

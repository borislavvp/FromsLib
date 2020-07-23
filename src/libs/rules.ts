import { Rule, Rules } from '../types';
const email: Rule = {
	validate: function(value: string) {
		// eslint-disable-next-line
		const isEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return Promise.resolve(isEmail.test(value));
	},
	message: 'This email is not valid!',
};
const required: Rule = {
	validate: function(value: string | Object, isRequired: string = 'true') {
		return Promise.resolve(
			(() => {
				if (!isRequired || ['no', 'false'].includes(isRequired)) {
					return true;
				}
				if (Array.isArray(value)) {
					return !!value.length;
				}
				if (typeof value === 'string') {
					return !!value;
				}
				if (typeof value === 'object') {
					return !value ? false : !!Object.keys(value).length;
				}
				return true;
			})()
		);
	},
	message: 'This field is required!',
};

export const rules: Rules = {
	email: email,
	required: required,
};

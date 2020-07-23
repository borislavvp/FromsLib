export interface Rule {
	validate: Function;
	message: String;
}

export interface Rules {
	[key: string]: Rule;
}

export interface IFormData {
	[key: string]: {
		value: string;
		valid: Boolean;
	};
}

export interface IForm {
	[key: string]: string | boolean;
}
interface InputProps {
	name: {
		type: string;
		required: true;
	};
	input: {
		type: string;
		default: '';
	};
	label: string;
	placeholder: string;
	valid: Boolean;
	errors: string[];
	listeners: Object;
	live: {
		type: Boolean;
		default: true;
	};
}
export interface InputTextProps extends InputProps {}

export interface InputSelectProps extends InputProps {
	options: {
		type: string[];
		required: true;
	};
}

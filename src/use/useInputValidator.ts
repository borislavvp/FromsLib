import { ref, Ref, watch } from '@vue/composition-api';
import { Rule } from '../types';

export default function(startVal: string, validators: Rule[], onValidate: Function) {
	let input = ref(startVal);
	let valid: Ref<Boolean> = ref(true);
	let errors: Ref<String[]> = ref([]);
	watch(
		input,
		async (value) => {
			let currentErrors: String[] = [];
			await Promise.all(
				validators.map((rule: Rule) => {
					rule.validate(value).then((res: Boolean) => {
						if (!res) {
							currentErrors.push(rule.message);
						}
					});
				})
			);
			errors.value = currentErrors;
			valid.value = errors.value.length > 0 ? false : true;
			onValidate(value, valid.value, errors.value);
		},
		{
			immediate: true,
		}
	);
	return {
		input,
		errors,
		valid,
	};
}

import { ref, Ref, watch, ComputedRef, computed } from '@vue/composition-api';
import { IForm, IFormData } from '../types';

export default function(formData: Ref<IFormData>, onValidate: Function) {
	let form: ComputedRef<IForm> = computed(() => {
		return {};
	});
	watch(
		formData,
		async (data) => {
			await Promise.resolve(data).then(() => {
				if (data) {
					form.value['valid'] = true;
					Object.keys(data).map((key) => {
						form.value[key] = data[key].value;
						if (form.value['valid'] && !data[key].valid) {
							form.value['valid'] = false;
						}
					});
				}
			});
			onValidate(form.value);
		},
		{
			deep: true,
		}
	);
	return {
		form,
	};
}

type TemplateHookArgs = {
	some?: any;
};

export const templateHook = ({ some }: TemplateHookArgs) => {
	return { some };
};

export default templateHook;

type templateHookArgs = {
	some?: any;
};

export const templateHook = ({ some }: templateHookArgs) => {
	return { some };
};

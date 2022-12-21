import { useCallback, useState } from 'react';

type TemplateHookArgs = {
	some?: any;
};

export const useSiteSelector = ({ some }: TemplateHookArgs) => {
	const [selectedSites, setSelectedSites] = useState<string[]>([]);

	const targetSiteHandler = useCallback(
		(val: string) => {
			const incomeValue = selectedSites.find((site) => site === val);

			if (!incomeValue) {
				setSelectedSites([...selectedSites, val]);
				return;
			}
			const index = selectedSites.findIndex((site) => site === val);
			if (index > -1) {
				const temp = JSON.parse(JSON.stringify(selectedSites));
				temp.splice(index, 1);
				setSelectedSites(temp);
			}
			return;
		},
		[selectedSites]
	);

	return { selectedSites, action: { targetSiteHandler } };
};

export default useSiteSelector;

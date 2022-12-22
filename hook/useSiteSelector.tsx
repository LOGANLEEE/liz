import { useCallback, useState } from 'react';

export const useSiteSelector = () => {
	const [selectedSites, setSelectedSites] = useState<string[]>([]);

	const resetSelectedSites = useCallback(() => {
		setSelectedSites(['']);
	}, []);

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

	return { selectedSites, action: { targetSiteHandler, resetSelectedSites } };
};

export default useSiteSelector;

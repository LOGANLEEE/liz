import React, { useEffect } from 'react';

// xs <650
// sm 650
// md 960
// lg 1280
// xl 1400
const useMediaQuery = (width: number) => {
	const [targetReached, setTargetReached] = React.useState(false);

	const updateTarget = React.useCallback((e: MediaQueryListEvent) => {
		if (e.matches) {
			setTargetReached(true);
		} else {
			setTargetReached(false);
		}
	}, []);

	useEffect(() => {
		const media = window.matchMedia(`(max-width: ${width}px)`);
		media.addListener(updateTarget);

		// Check on mount (callback is not called until a change occurs)
		if (media.matches) {
			setTargetReached(true);
		}

		return () => media.removeListener(updateTarget);
	}, [updateTarget, width]);

	return targetReached;
};

export default useMediaQuery;

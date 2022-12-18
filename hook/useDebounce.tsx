import { useState, useEffect } from 'react';

type Props = {
	value: any;
	delay: number;
};
const useDebounce = ({ value, delay }: Props) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;

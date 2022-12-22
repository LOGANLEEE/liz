import { useCallback, useState } from 'react';

type Props = {
	defaultOpen?: boolean;
};
export const useControlModal = ({ defaultOpen }: Props) => {
	const [isOpen, setIsOpen] = useState(defaultOpen || false);

	const modalOpenHandler = useCallback(() => {
		setIsOpen(true);
	}, []);

	const modalCloseHandler = useCallback(() => {
		setIsOpen(false);
	}, []);

	return {
		isOpen,
		action: {
			modalCloseHandler,
			modalOpenHandler,
		},
	};
};

export default useControlModal;

import { FormElement } from '@nextui-org/react';
import useDebounce from 'hook/useDebounce';
import React, { useCallback, useState } from 'react';

type UseSearch = {
	some?: string;
};

const useSearch = ({ some }: UseSearch) => {
	const [searchText, setSearchText] = useState('');
	const searchTextHandler = useCallback((e: React.ChangeEvent<FormElement>) => {
		setSearchText(e.target.value);
	}, []);

	const debouncedSearchText = useDebounce({ value: searchText, delay: 300 });

	const clearSearchText = useCallback(() => {
		setSearchText('');
	}, []);

	return { searchText: debouncedSearchText, action: { clearSearchText, searchTextHandler } };
};

export default useSearch;

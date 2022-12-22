import { FormElement } from '@nextui-org/react';
import useDebounce from 'hook/useDebounce';
import { OrderBy } from 'lib/crawl/logic/post';
import React, { useCallback, useEffect, useState } from 'react';

const paginationKey = 'pagination';

type Pagination = {
	pageIdx: number;
};

const usePagination = () => {
	const [pageIdx, setPageIdx] = useState(1);
	const [orderByHit, setOrderByHit] = useState<OrderBy>('desc');
	const limit = 20;
	const [searchText, setSearchText] = useState('');
	const searchTextHandler = useCallback((e: React.ChangeEvent<FormElement>) => {
		setSearchText(e.target.value);
	}, []);

	useEffect(() => {
		setPageIdx(1);
	}, [searchText]);

	const debouncedSearchText = useDebounce({ value: searchText, delay: 300 });
	const debouncedPageIdx = useDebounce({ value: pageIdx, delay: 300 });

	const clearSearchText = useCallback(() => {
		setSearchText('');
	}, []);

	const pageIndexHandler = useCallback((pageIdx: number) => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
		setPageIdx(pageIdx);
		sessionStorage.setItem(paginationKey, JSON.stringify({ pageIdx }));
		return;
	}, []);

	const toggleOrderByHit = useCallback(() => {
		setOrderByHit(orderByHit === 'desc' ? 'asc' : 'desc');
	}, [orderByHit]);

	useEffect(() => {
		const pagination: Pagination = JSON.parse(sessionStorage.getItem(paginationKey) || '{}');

		if (!pagination?.pageIdx) {
			sessionStorage.setItem(paginationKey, JSON.stringify({ pageIdx: 1 }));
			setPageIdx(1);
			return;
		}
		setPageIdx(pagination.pageIdx);
		return;
	}, []);

	return {
		pageIdx: debouncedPageIdx,
		limit,
		order: { orderByHit, toggleOrderByHit },
		actions: { pageIndexHandler },
		search: { searchText: debouncedSearchText, clearSearchText, searchTextHandler },
	};
};

export default usePagination;

import { FormElement } from '@nextui-org/react';
import { OrderBy } from 'lib/crawl/logic/post';
import React, { useCallback, useEffect, useState } from 'react';

const paginationKey = 'pagination';

type usePaginationArgs = {
	some?: any;
};

type Pagination = {
	pageIdx: number;
};

export const usePagination = ({ some }: usePaginationArgs) => {
	const [pageIdx, setPageIdx] = useState(1);
	const [orderByHit, setOrderByHit] = useState<OrderBy>('desc');
	const limit = 20;
	const [searchText, setSearchText] = useState('');

	const searchTextHandler = useCallback((e: React.ChangeEvent<FormElement>) => {
		setSearchText(e.target.value);
	}, []);

	const clearSearchText = useCallback(() => {
		setSearchText('');
	}, []);

	const pageIdxHandler = useCallback((pageIdx: number) => {
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
		pageIdx,
		limit,
		order: { orderByHit, toggleOrderByHit },
		actions: { pageIdxHandler },
		search: { searchText, clearSearchText, searchTextHandler },
	};
};

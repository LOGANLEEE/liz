import { useCallback, useEffect, useState } from 'react';

const paginationKey = 'pagination';

type usePaginationArgs = {
	some?: any;
};

type Pagination = {
	pageIdx: number;
};

export const usePagination = ({ some }: usePaginationArgs) => {
	const [pageIdx, setPageIdx] = useState(1);
	const limit = 20;

	const pageIdxHandler = useCallback((pageIdx: number) => {
		window.scrollTo({ behavior: 'smooth', top: 0 });
		setPageIdx(pageIdx);
		sessionStorage.setItem(paginationKey, JSON.stringify({ pageIdx }));
		return;
	}, []);

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

	return { pageIdx, limit, actions: { pageIdxHandler } };
};

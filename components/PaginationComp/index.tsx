import { Pagination } from '@nextui-org/react';
import { memo } from 'react';
import styled from 'styled-components';

type BottomPaginationProps = {
	totalCount: number;
	limit: number;
	page: number;
	onChangeHandler: (pageNum: number) => void;
};

export const PaginationComp = memo(({ totalCount, limit, page, onChangeHandler }: BottomPaginationProps) => {
	return <StyledPagination onChange={onChangeHandler} color={'secondary'} total={Math.ceil(totalCount / limit)} page={page} />;
});

PaginationComp.displayName = 'PaginationComp';

const StyledPagination = styled(Pagination)`
	z-index: 1;
`;

import { Pagination } from '@nextui-org/react';
import { memo } from 'react';

type BottomPaginationProps = {
	totalCount: number;
	limit: number;
	page: number;
	onChangeHandler: (pageNum: number) => void;
};

export const PaginationComp = memo(({ totalCount, limit, page, onChangeHandler }: BottomPaginationProps) => {
	return (
		// <Wrapper>
		<Pagination onChange={onChangeHandler} color={'secondary'} total={Math.ceil(totalCount / limit)} page={page} />
		// </Wrapper>
	);
});

PaginationComp.displayName = 'PaginationComp';

// const Wrapper = styled.div``;

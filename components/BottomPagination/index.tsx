import { Grid, Loading, Pagination } from '@nextui-org/react';
import { memo } from 'react';
import styled from 'styled-components';

type BottomPaginationProps = {
	totalCount: number;
	limit: number;
	page: number;
	onChangeHandler: (pageNum: number) => void;
};

export const BottomPagination = memo(({ totalCount, limit, page, onChangeHandler }: BottomPaginationProps) => {
	return (
		<Wrapper>
			<Grid.Container gap={2} justify='center'>
				<Grid xs={12}>
					<Pagination onChange={onChangeHandler} color={'secondary'} total={Math.ceil(totalCount / limit)} page={page} />
				</Grid>
			</Grid.Container>
		</Wrapper>
	);
});

BottomPagination.displayName = 'BottomPagination';

const Wrapper = styled(Grid)``;

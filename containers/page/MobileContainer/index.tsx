import { Grid } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import { BottomPagination } from 'components/BottomPagination';
import { InfoText } from 'components/InfoText';
import { PostContainer } from 'containers/PostContainer';
import styled from 'styled-components';

type Props = {
	totalCount: number;
	targetSiteCount: number;
	limit: number;
	pageIdx: number;
	pageIdxHandler: (pageNum: number) => void;
	freshPostList: fresh_post[];
	recentAccessLog?: api_log;
};

const MobileContainer = ({ limit, pageIdxHandler, pageIdx, recentAccessLog, targetSiteCount, totalCount, freshPostList }: Props) => {
	return (
		<Wrapper direction='row' justify='center' gap={1}>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center'>
				<InfoText targetSiteCount={targetSiteCount} postCount={totalCount} recentAccessLog={recentAccessLog} />
			</Grid>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center'>
				<BottomPagination limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIdxHandler} />
			</Grid>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center'>
				<PostContainer posts={freshPostList} />
			</Grid>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center'>
				<BottomPagination limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIdxHandler} />
			</Grid>
		</Wrapper>
	);
};

export default MobileContainer;

const Wrapper = styled(Grid.Container)`
	width: 100%;
	overflow-x: hidden;
	padding-right: 0;
	padding-left: 0;
`;

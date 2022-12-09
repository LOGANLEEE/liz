import { Grid } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import { BottomPagination } from 'components/BottomPagination';
import { InfoCard } from 'containers/InfoBar';
import { PostContainer } from 'containers/PostContainer';
import { format } from 'date-fns';
import styled from 'styled-components';

type Props = {
	totalCount: number;
	targetSiteCount: number;
	limit: number;
	pageIdx: number;
	pageIdxHandler: (pageNum: number) => void;
	freshPostList: fresh_post[];
	recentAccessLog: api_log;
};

const MobileContainer = ({ limit, pageIdxHandler, pageIdx, recentAccessLog, targetSiteCount, totalCount, freshPostList }: Props) => {
	return (
		<Wrapper direction='row' justify='center' gap={1}>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center'>
				{/* <InfoBar postCount={totalCount} targetSiteCount={Object.keys(names).length} /> */}
				<Grid.Container justify='center' gap={1}>
					<Grid xs sm>
						<InfoCard
							count={totalCount}
							title='최근 동작 시점'
							titleInfo={format(new Date(recentAccessLog.create_date), `MM월 dd일  HH시 mm분 ss초`)}
							prefix='총'
							suffix='개'
						/>
					</Grid>
					<Grid xs sm>
						<InfoCard count={targetSiteCount} titleInfo='대상 커뮤니티' suffix='군데' />
					</Grid>
				</Grid.Container>
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

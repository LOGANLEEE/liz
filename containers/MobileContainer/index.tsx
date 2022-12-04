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
		<Wrapper direction='column' justify='flex-start' gap={1}>
			<Grid xs={12} sm={12}>
				{/* <InfoBar postCount={totalCount} targetSiteCount={Object.keys(names).length} /> */}
				<Grid.Container justify='center'>
					<Grid xs sm>
						<InfoCard
							count={totalCount}
							title='최근 동작 시점'
							titleInfo={format(new Date(recentAccessLog.create_date), `HH시 mm분 ss초`)}
							prefix='총'
							suffix='개'
						/>
					</Grid>
					<Grid xs sm>
						<InfoCard count={targetSiteCount} titleInfo='대상 커뮤니티' suffix='군데' />
					</Grid>
				</Grid.Container>
			</Grid>
			<Grid justify='center' xs={12} sm={12}>
				<BottomPagination limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIdxHandler} />
			</Grid>
			<Grid xs={12} sm={12}>
				<PostContainer posts={freshPostList} />
			</Grid>
			<Grid justify='center' xs={12} sm={12}>
				<BottomPagination limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIdxHandler} />
			</Grid>
		</Wrapper>
	);
};

export default MobileContainer;

const Wrapper = styled(Grid.Container)`
	overflow-x: hidden;
	padding-right: 0;
	padding-left: 0;
`;

import { Grid } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import { BottomPagination } from 'components/BottomPagination';
import { InfoCard } from 'containers/InfoBar';
import { PostContainer } from 'containers/PostContainer';
import { format } from 'date-fns';

type Props = {
	totalCount: number;
	targetSiteCount: number;
	limit: number;
	recentAccessLog: api_log;
	pageIdx: number;
	pageIdxHandler: (pageNum: number) => void;
	freshPostList: fresh_post[];
};

const DesktopContainer = ({ limit, pageIdxHandler, pageIdx, targetSiteCount, totalCount, freshPostList, recentAccessLog }: Props) => {
	return (
		<Grid.Container justify='center' direction='row' gap={1}>
			<Grid xs={1} sm={2} md={1} lg={1} xl={1}>
				left
			</Grid>
			<Grid xs={10} sm={8} md={10} lg={10} xl={10}>
				<Grid.Container justify='center' direction='row' gap={2}>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						{/* <InfoBar postCount={totalCount} targetSiteCount={Object.keys(names).length} /> */}
						<Grid.Container justify='flex-start' gap={1}>
							<Grid xs sm md lg xl>
								<InfoCard
									count={totalCount}
									title='최근 동작 시점'
									titleInfo={format(new Date(recentAccessLog.create_date), `MM월 dd일  HH시mm분ss초`)}
									prefix='총'
									suffix='개'
								/>
							</Grid>
							<Grid xs sm md lg xl>
								<InfoCard count={targetSiteCount} titleInfo='대상 커뮤니티' suffix='군데' />
							</Grid>
						</Grid.Container>
					</Grid>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<BottomPagination limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIdxHandler} />
					</Grid>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<PostContainer posts={freshPostList} />
					</Grid>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<BottomPagination limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIdxHandler} />
					</Grid>
				</Grid.Container>
			</Grid>
			<Grid xs={1} sm={2} md={1} lg={1} xl={1}>
				right
			</Grid>
		</Grid.Container>
	);
};

export default DesktopContainer;

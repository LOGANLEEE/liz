import { Grid, Input } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import type { CommunityContainerProps } from 'pages/community';

const TargetSiteSelector = dynamic(() => import('components/TargetSiteSelector'), {});
const InfoText = dynamic(() => import('components/InfoText'), {});
const PostContainer = dynamic(() => import('containers/PostContainer'), {});
const PostOrder = dynamic(() => import('components/PostOrderButton'), {});
const PaginationComp = dynamic(() => import('components/PaginationComp'), {});

const DesktopContainer = ({
	orderByHit,
	toggleOrderByHit,
	limit,
	pageIndexHandler,
	pageIdx,
	targetSiteCount,
	postCount,
	freshPostList,
	recentAccessLog,
	clearSearchText,
	searchText,
	searchTextHandler,
	selectedSites,
	targetSiteHandler,
	totalPostCount,
}: CommunityContainerProps) => {
	return (
		<Grid.Container justify='center' direction='row' gap={0.5}>
			<Grid xs={1} sm={2} md={1} lg={1} xl={1}>
				left
			</Grid>
			<Grid xs={10} sm={8} md={10} lg={10} xl={10}>
				<Grid.Container justify='center' direction='row' gap={2}>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<InfoText targetSiteCount={targetSiteCount} postCount={totalPostCount} recentAccessLog={recentAccessLog} />
					</Grid>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='space-between'>
						<Input
							clearable
							onClearClick={clearSearchText}
							onChange={searchTextHandler}
							initialValue={searchText}
							underlined
							placeholder='Search...'
							width='100%'
						/>
					</Grid>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<PaginationComp limit={limit} totalCount={postCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
					</Grid>

					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<PostContainer posts={freshPostList} />
					</Grid>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<PaginationComp limit={limit} totalCount={postCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
					</Grid>
				</Grid.Container>
			</Grid>
			<Grid xs={1} sm={2} md={1} lg={1} xl={1} direction='column'>
				<PostOrder orderByHit={orderByHit} toggleOrderByHit={toggleOrderByHit} />
				<TargetSiteSelector useTitle selectedSites={selectedSites} targetSiteHandler={targetSiteHandler} />
			</Grid>
		</Grid.Container>
	);
};

export default DesktopContainer;

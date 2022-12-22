import { FormElement, Grid, Input } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import { OrderBy } from 'lib/crawl/logic/post';
import dynamic from 'next/dynamic';
import React, { ChangeEvent } from 'react';

const TargetSiteSelector = dynamic(() => import('components/TargetSiteSelector'), {});
const InfoText = dynamic(() => import('components/InfoText'), {});
const PostContainer = dynamic(() => import('containers/PostContainer'), {});
const PostOrder = dynamic(() => import('components/PostOrderButton'), {});
const PaginationComp = dynamic(() => import('components/PaginationComp'), {});

type Props = {
	totalCount: number;
	targetSiteCount: number;
	limit: number;
	pageIdx: number;
	freshPostList: fresh_post[];
	recentAccessLog?: api_log;
	orderByHit: OrderBy;
	toggleOrderByHit: () => void;
	searchText: string;
	clearSearchText: () => void;
	searchTextHandler: (e: ChangeEvent<FormElement>) => void;
	pageIndexHandler: (pageNum: number) => void;
	selectedSites: string[];
	targetSiteHandler: (val: string) => void;
};

const DesktopContainer = ({
	orderByHit,
	toggleOrderByHit,
	limit,
	pageIndexHandler,
	pageIdx,
	targetSiteCount,
	totalCount,
	freshPostList,
	recentAccessLog,
	clearSearchText,
	searchText,
	searchTextHandler,
	selectedSites,
	targetSiteHandler,
}: Props) => {
	return (
		<Grid.Container justify='center' direction='row' gap={0.5}>
			<Grid xs={1} sm={2} md={1} lg={1} xl={1}>
				left
			</Grid>
			<Grid xs={10} sm={8} md={10} lg={10} xl={10}>
				<Grid.Container justify='center' direction='row' gap={2}>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<InfoText targetSiteCount={targetSiteCount} postCount={totalCount} recentAccessLog={recentAccessLog} />
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
						<PaginationComp limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
					</Grid>

					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<PostContainer posts={freshPostList} />
					</Grid>
					<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
						<PaginationComp limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
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

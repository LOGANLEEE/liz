import { FormElement, Grid, Input } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import { OrderBy } from 'lib/crawl/logic/post';
import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';

const InfoText = dynamic(() => import('components/InfoText'), {});
const PostContainer = dynamic(() => import('containers/PostContainer'), {});
const PostOrder = dynamic(() => import('components/PostOrder'), {});
const PaginationComp = dynamic(() => import('components/PaginationComp'), {});

type Props = {
	totalCount: number;
	targetSiteCount: number;
	limit: number;
	pageIdx: number;
	pageIndexHandler: (pageNum: number) => void;
	freshPostList: fresh_post[];
	recentAccessLog?: api_log;
	orderByHit: OrderBy;
	toggleOrderByHit: () => void;
	searchText: string;
	clearSearchText: () => void;
	searchTextHandler: (e: React.ChangeEvent<FormElement>) => void;
};

const MobileContainer = ({
	limit,
	pageIndexHandler,
	pageIdx,
	recentAccessLog,
	targetSiteCount,
	totalCount,
	freshPostList,
	orderByHit,
	toggleOrderByHit,
	clearSearchText,
	searchText,
	searchTextHandler,
}: Props) => {
	return (
		<Wrapper direction='row' justify='center' gap={1}>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
				<InfoText targetSiteCount={targetSiteCount} postCount={totalCount} recentAccessLog={recentAccessLog} />
			</Grid>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='space-between' className='item'>
				<Input
					clearable
					underlined
					placeholder='Search...'
					width='70%'
					onClearClick={clearSearchText}
					onChange={searchTextHandler}
					initialValue={searchText}
				/>
				<PostOrder orderByHit={orderByHit} toggleOrderByHit={toggleOrderByHit} />
			</Grid>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
				<PaginationComp limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
			</Grid>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
				<PostContainer posts={freshPostList} />
			</Grid>
			<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
				<PaginationComp limit={limit} totalCount={totalCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
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
	margin-right: 0;
	margin-left: 0;

	.item {
		padding-right: 0;
		padding-left: 0;
	}
`;

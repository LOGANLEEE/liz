import { FormElement, Grid, Input, Spacer } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import useControlModal from 'hook/useControlModal';
import { OrderBy } from 'lib/crawl/logic/post';
import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

const SiteSelectModal = dynamic(() => import('components/Modal/SiteSelectModal'), {});
const SiteSelectorButton = dynamic(() => import('components/SiteSelectorButton'), {});
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
	pageIndexHandler: (pageNum: number) => void;
	freshPostList: fresh_post[];
	recentAccessLog?: api_log;
	orderByHit: OrderBy;
	toggleOrderByHit: () => void;
	searchText: string;
	clearSearchText: () => void;
	searchTextHandler: (e: ChangeEvent<FormElement>) => void;
	selectedSites: string[];
	targetSiteHandler: (val: string) => void;
	resetSelectedSites: () => void;
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
	selectedSites,
	targetSiteHandler,
	resetSelectedSites,
}: Props) => {
	const {
		isOpen,
		action: { modalCloseHandler, modalOpenHandler },
	} = useControlModal({ defaultOpen: false });

	return (
		<>
			<Wrapper direction='row' justify='center' gap={1}>
				<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
					<InfoText targetSiteCount={targetSiteCount} postCount={totalCount} recentAccessLog={recentAccessLog} />
				</Grid>
				<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='flex-end' className='item'>
					<SiteSelectorButton onClickHandler={modalOpenHandler} />
					<Spacer x={0.5} />
					<PostOrder orderByHit={orderByHit} toggleOrderByHit={toggleOrderByHit} />
				</Grid>
				<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='space-between' className='item'>
					<Input
						clearable
						underlined
						placeholder='Search...'
						width='100%'
						onClearClick={clearSearchText}
						onChange={searchTextHandler}
						initialValue={searchText}
					/>
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
			<SiteSelectModal visible={isOpen} onCloseHandler={modalCloseHandler} onReset={resetSelectedSites}>
				<TargetSiteSelector selectedSites={selectedSites} targetSiteHandler={targetSiteHandler} />
			</SiteSelectModal>
		</>
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

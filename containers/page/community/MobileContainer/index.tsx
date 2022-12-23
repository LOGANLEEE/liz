import { Grid, Input, Spacer } from '@nextui-org/react';
import useControlModal from 'hook/useControlModal';
import dynamic from 'next/dynamic';
import type { CommunityContainerProps } from 'pages/community';
import styled from 'styled-components';

const SiteSelectModal = dynamic(() => import('components/Modal/SiteSelectModal'), {});
const SiteSelectorButton = dynamic(() => import('components/SiteSelectorButton'), {});
const TargetSiteSelector = dynamic(() => import('components/TargetSiteSelector'), {});
const InfoText = dynamic(() => import('components/InfoText'), {});
const PostContainer = dynamic(() => import('containers/PostContainer'), {});
const PostOrder = dynamic(() => import('components/PostOrderButton'), {});
const PaginationComp = dynamic(() => import('components/PaginationComp'), {});

const MobileContainer = ({
	limit,
	pageIndexHandler,
	pageIdx,
	recentAccessLog,
	targetSiteCount,
	postCount,
	freshPostList,
	orderByHit,
	toggleOrderByHit,
	clearSearchText,
	searchText,
	searchTextHandler,
	selectedSites,
	targetSiteHandler,
	resetSelectedSites,
	totalPostCount,
}: CommunityContainerProps) => {
	const {
		isOpen,
		action: { modalCloseHandler, modalOpenHandler },
	} = useControlModal({ defaultOpen: false });

	return (
		<>
			<Wrapper direction='row' justify='center' gap={1}>
				<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
					<InfoText targetSiteCount={targetSiteCount} postCount={totalPostCount} recentAccessLog={recentAccessLog} />
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
					<PaginationComp limit={limit} totalCount={postCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
				</Grid>
				<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
					<PostContainer posts={freshPostList} />
				</Grid>
				<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5} justify='center' className='item'>
					<PaginationComp limit={limit} totalCount={postCount} page={pageIdx} onChangeHandler={pageIndexHandler} />
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

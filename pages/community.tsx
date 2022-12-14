import type { FormElement } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import usePagination from 'hook/usePagination';
import useSiteSelector from 'hook/useSiteSelector';
import { _axios } from 'lib/axiosInstance';
import type { GetFreshPostReturn, OrderBy } from 'lib/crawl/logic/post';
import { communityNames } from 'lib/crawl/targetSiteInfo';
import { getRecentAccessLogQuery } from 'lib/log';
import type { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { getSelectorsByUserAgent } from 'react-device-detect';
import useSWR from 'swr';

type Props = {
	isMobile: boolean;
	recentAccessLog?: api_log;
	totalPostCount: number;
};
export type CommunityContainerProps = {
	totalPostCount: number;
	postCount: number;
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
const MobileContainer = dynamic(() => import('containers/page/community/MobileContainer'), {});
const DesktopContainer = dynamic(() => import('containers/page/community/DesktopContainer'), {});
const CustomLoading = dynamic(() => import('components/CustomLoading'), {});

const Community = ({ isMobile = true, recentAccessLog, totalPostCount }: Props) => {
	const {
		pageIdx,
		limit,
		order,
		actions: { pageIndexHandler },
		search,
	} = usePagination();

	const siteSelector = useSiteSelector();

	useEffect(() => {
		pageIndexHandler(1);
	}, [pageIndexHandler, siteSelector.selectedSites]);

	const { data, error, isValidating } = useSWR<GetFreshPostReturn>(
		`/api/crawl/getFreshPost/${pageIdx}/${order.orderByHit}/${search.searchText}/${siteSelector.selectedSites}`,
		async () =>
			await _axios
				.post(`/api/crawl/getFreshPost`, {
					orderByHit: order.orderByHit,
					limit,
					offset: (pageIdx - 1) * limit,
					searchText: search.searchText,
					sites: siteSelector.selectedSites,
				})
				.then((res) => res?.data)
	);

	const [postCount, setPostCount] = useState(0);
	const [freshPostList, setFreshPostList] = useState<fresh_post[]>([]);

	useEffect(() => {
		if (data?.list && data?.list?.length > 0) {
			setFreshPostList(data.list);
		}
	}, [data?.list]);

	useEffect(() => {
		if (data?.postCount && data?.postCount > 0 && data?.postCount !== postCount) {
			setPostCount(data.postCount);
		}
	}, [data?.postCount, postCount]);

	const pageOnKeyDownHandler = useCallback(
		(e: KeyboardEvent<HTMLElement>) => {
			if (e.key === 'ArrowLeft' && pageIdx > 1) pageIndexHandler(pageIdx - 1);
			if (e.key === 'ArrowRight' && pageIdx <= Math.ceil(postCount / limit)) pageIndexHandler(pageIdx + 1);
			return;
		},
		[limit, pageIdx, pageIndexHandler, postCount]
	);

	return (
		<>
			<div>
				<Head>
					<title>Seize what you want without NO LIMIT.</title>
					<meta name='description' content='Generated by create next app' />
					<link rel='icon' href='/favicon.ico' />
					<meta name='viewport' content='initial-scale=1, width=device-width' />
				</Head>
				<main tabIndex={0} onKeyDown={pageOnKeyDownHandler}>
					{isMobile && (
						<MobileContainer
							totalPostCount={totalPostCount}
							selectedSites={siteSelector.selectedSites}
							{...siteSelector.action}
							{...order}
							{...search}
							recentAccessLog={recentAccessLog}
							postCount={postCount}
							targetSiteCount={Object.keys(communityNames).length}
							limit={limit}
							pageIdx={pageIdx}
							pageIndexHandler={pageIndexHandler}
							freshPostList={freshPostList}
						/>
					)}
					{!isMobile && (
						<DesktopContainer
							totalPostCount={totalPostCount}
							selectedSites={siteSelector.selectedSites}
							{...siteSelector.action}
							{...order}
							{...search}
							recentAccessLog={recentAccessLog}
							postCount={postCount}
							targetSiteCount={Object.keys(communityNames).length}
							limit={limit}
							pageIdx={pageIdx}
							pageIndexHandler={pageIndexHandler}
							freshPostList={freshPostList}
						/>
					)}
				</main>
			</div>
			{isValidating && <CustomLoading />}
		</>
	);
};
export default Community;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	const userAgent = req.headers['user-agent'] || '';

	const detect = getSelectorsByUserAgent(userAgent);

	const { recentAccessLog, totalPostCount } = await getRecentAccessLogQuery();

	return {
		props: {
			isMobile: detect?.isMobile,
			recentAccessLog: JSON.parse(JSON.stringify(recentAccessLog)),
			totalPostCount,
		},
	};
}

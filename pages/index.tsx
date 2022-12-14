import { Grid, Text } from '@nextui-org/react';
import type { api_log, fresh_post } from '@prisma/client';
import { CustomLoading } from 'components/CustomLoading';
import { usePagination } from 'hook/usePagination';
import { _axios } from 'lib/axiosInstance';
import type { GetFreshPostReturn } from 'lib/crawl/logic/post';
import { names } from 'lib/crawl/targetInfo';
import { getRecentAccessLog } from 'lib/log';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { getSelectorsByUserAgent } from 'react-device-detect';
import useSWR from 'swr';

type Props = {
	isMobile: boolean;
	recentAccessLog?: api_log;
};
const MobileContainer = dynamic(() => import('containers/page/MobileContainer'), {});
const DesktopContainer = dynamic(() => import('containers/page/DesktopContainer'), {});

const Home = ({ isMobile = true, recentAccessLog }: Props) => {
	const {
		pageIdx,
		limit,
		order,
		actions: { pageIndexHandler },
		search,
	} = usePagination({});

	const { data, error, isValidating } = useSWR<GetFreshPostReturn>(
		`/api/crawl/getFreshPost/${pageIdx}/${order.orderByHit}/${search.searchText}`,
		async () =>
			await _axios
				.post(`/api/crawl/getFreshPost`, {
					orderByHit: order.orderByHit,
					limit,
					offset: (pageIdx - 1) * limit,
					searchText: search.searchText,
				})
				.then((res) => res.data)
	);

	const [totalCount, setTotalCount] = useState(0);
	const [freshPostList, setFreshPostList] = useState<fresh_post[]>([]);

	useEffect(() => {
		if (data?.list && data?.list?.length > 0) {
			setFreshPostList(data.list);
		}
	}, [data?.list]);

	useEffect(() => {
		if (data?.totalCount && data?.totalCount > 0 && data?.totalCount !== totalCount) {
			setTotalCount(data.totalCount);
		}
	}, [data?.totalCount, totalCount]);

	const pageOnKeyDownHandler = useCallback(
		(e: KeyboardEvent<HTMLElement>) => {
			if (e.key === 'ArrowLeft' && pageIdx > 1) pageIndexHandler(pageIdx - 1);
			if (e.key === 'ArrowRight' && pageIdx <= Math.ceil(totalCount / limit)) pageIndexHandler(pageIdx + 1);
			return;
		},
		[limit, pageIdx, pageIndexHandler, totalCount]
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
							{...order}
							{...search}
							recentAccessLog={recentAccessLog}
							totalCount={totalCount}
							targetSiteCount={Object.keys(names).length}
							limit={limit}
							pageIdx={pageIdx}
							pageIndexHandler={pageIndexHandler}
							freshPostList={freshPostList}
						/>
					)}
					{!isMobile && (
						<DesktopContainer
							{...order}
							{...search}
							recentAccessLog={recentAccessLog}
							totalCount={totalCount}
							targetSiteCount={Object.keys(names).length}
							limit={limit}
							pageIdx={pageIdx}
							pageIndexHandler={pageIndexHandler}
							freshPostList={freshPostList}
						/>
					)}
				</main>

				<footer>
					<Grid.Container direction='column' justify='center'>
						<Text css={{ textAlign: 'center' }}>Logan will deserve all rights.</Text>
						<Text css={{ textAlign: 'center' }}>ver.0.0.1</Text>
					</Grid.Container>
				</footer>
			</div>
			{isValidating && <CustomLoading />}
		</>
	);
};
export default Home;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	const userAgent = req.headers['user-agent'] || '';

	const detect = getSelectorsByUserAgent(userAgent);

	const recentAccessLog = await getRecentAccessLog();

	return {
		props: {
			isMobile: detect?.isMobile || true,
			recentAccessLog: JSON.parse(JSON.stringify(recentAccessLog)),
		},
	};
}

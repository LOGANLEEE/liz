import { Grid } from '@nextui-org/react';
import { fresh_post } from '@prisma/client';
import PostContainer from 'containers/PostContainer';
import { names } from 'lib/crawl/targetInfo';
import dynamic from 'next/dynamic';
import type { ChartData } from 'types';

type Props = { totalPostCount: number; topPosts: fresh_post[]; chartData: ChartData[] };

const CustomLineChart = dynamic(() => import('components/CustomLineChart'), {});
const InfoCard = dynamic(() => import('components/InfoCard'), {});

const DesktopContainer = ({ topPosts, totalPostCount, chartData }: Props) => {
	const text = [
		{
			header: '프리랜서',
			subHeader: '프로젝트를 찾고 계신가요?',
			body: '준비 중 입니다.',
			link: '/freelancer',
			linkDescription: '바로가기',
			sm: 6,
		},
		{
			header: '실시간 인기글',
			subHeader: `국내 커뮤니티 ${Object.keys(names).length}곳에서 ${totalPostCount}개의 인기 게시글을 모았습니다.`,
			body: <PostContainer posts={topPosts} />,
			link: '/community',
			linkDescription: '더 보기',
			sm: 6,
		},
		{
			header: '시각화된 게시글 분석을 확인해보세요',
			// subHeader: `게시글 시각화`,
			body: (
				<CustomLineChart
					chartData={chartData}
					width={1000}
					height={500}
					dataKeys={['count']}
					XdataKey='name'
					syncId='aa'
					introText='사이트별 게시물 갯수'
				/>
			),
			sm: 12,
			link: '/visualize',
			linkDescription: '확인하기',
		},
	];
	return (
		<Grid.Container justify='center' direction='row' gap={1}>
			{text.map((e) => (
				<Grid xs sm={e.sm} md lg xl key={e.header}>
					<InfoCard {...e} />
				</Grid>
			))}
		</Grid.Container>
	);
};

export default DesktopContainer;

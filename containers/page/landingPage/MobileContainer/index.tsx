import { Grid } from '@nextui-org/react';
import { names } from 'lib/crawl/targetInfo';
import dynamic from 'next/dynamic';
import type { LandingPageProps } from 'pages/landing';
import styled from 'styled-components';

const InfoCard = dynamic(() => import('components/InfoCard'), {});
const CustomLineChart = dynamic(() => import('components/CustomLineChart'), {});
const PostContainer = dynamic(() => import('containers/PostContainer'), {});

const MobileContainer = ({ totalPostCount, topPosts, chartData }: LandingPageProps) => {
	const text = [
		{
			header: '실시간 인기글',
			subHeader: `국내 커뮤니티 ${Object.keys(names).length}곳에서 ${totalPostCount}개의 인기 게시글을 모았습니다.`,
			body: <PostContainer posts={topPosts} />,
			link: '/community',
			linkDescription: '더 보기',
			xs: 6,
		},
		{
			header: '프리랜서',
			subHeader: '프로젝트를 찾고 계신가요?',
			body: '준비 중 입니다.',
			link: '/freelancer',
			linkDescription: '바로가기',
			xs: 6,
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
			xs: 12,
			link: '/visualize',
			linkDescription: '확인하기',
		},
	];

	return (
		<Wrapper justify='center' direction='row' gap={1}>
			{text.map((e) => (
				<Grid xs={e.xs} sm md lg xl key={e.header}>
					<InfoCard {...e} />
				</Grid>
			))}
		</Wrapper>
	);
};

export default MobileContainer;

const Wrapper = styled(Grid.Container)`
	width: 100%;
	padding-right: 0;
	margin-left: 0;
	margin-right: 0;
	padding-left: 0;
	.nextui-grid-item {
		/* padding-right: 0; */
		/* padding-left: 0; */
	}
`;

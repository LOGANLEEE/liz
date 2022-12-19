import { Grid } from '@nextui-org/react';
import { fresh_post } from '@prisma/client';
import InfoCard from 'components/InfoCard';
import PostContainer from 'containers/PostContainer';
import { names } from 'lib/crawl/targetInfo';

type Props = { totalPostCount: number; topPosts: fresh_post[] };

const DesktopContainer = ({ topPosts, totalPostCount }: Props) => {
	const text = [
		{
			header: '프리랜서',
			subHeader: '프로젝트를 찾고 계신가요?',
			body: '준비 중 입니다.',
			link: '/freelancer',
			linkDescription: '바로가기',
		},
		{
			header: '실시간 인기글',
			subHeader: `국내 커뮤니티 ${Object.keys(names).length}곳에서 ${totalPostCount}개의 인기 게시글을 모았습니다.`,
			body: <PostContainer posts={topPosts} />,
			link: '/community',
			linkDescription: '더 보기',
		},
	];
	return (
		<Grid.Container justify='center' direction='row' gap={1}>
			{text.map((e) => (
				<Grid sm={6} md lg xl key={e.header}>
					<InfoCard {...e} />
				</Grid>
			))}
		</Grid.Container>
	);
};

export default DesktopContainer;

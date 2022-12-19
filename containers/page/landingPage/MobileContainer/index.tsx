import { Grid } from '@nextui-org/react';
import { fresh_post } from '@prisma/client';
import InfoCard from 'components/InfoCard';
import PostContainer from 'containers/PostContainer';
import { names } from 'lib/crawl/targetInfo';
import styled from 'styled-components';

type Props = { totalPostCount: number; topPosts: fresh_post[] };

const MobileContainer = ({ totalPostCount, topPosts }: Props) => {
	const text = [
		{
			header: '커뮤니티',
			subHeader: `국내 커뮤니티 ${Object.keys(names).length}곳에서 ${totalPostCount}개의 인기 게시글을 모았습니다 !`,
			body: <PostContainer posts={topPosts} />,
			link: '/community',
			linkDescription: '더 보기',
		},
		{
			header: '프리랜서',
			subHeader: '프로젝트를 찾고 계신가요?',
			body: '프로젝트를 찾고 계신가요?',
			link: '/freelancer',
			linkDescription: '바로가기',
		},
	];

	return (
		<Wrapper justify='center' direction='row' gap={2}>
			{text.map((e) => (
				<Grid xs={12} sm md lg xl key={e.header}>
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

import { Grid } from '@nextui-org/react';
import InfoCard from 'components/InfoCard';
import styled from 'styled-components';

type Props = { some?: string };

const MobileContainer = ({ some }: Props) => {
	const text = [
		{ header: '커뮤니티', subHeader: '모아보세요.', body: '실시간 커뮤니티 글', link: '/community', linkDescription: '바로가기' },
		{
			header: '프리랜서',
			subHeader: '프로젝트를 찾고 계신가요?',
			body: '프로젝트를 찾고 계신가요?',
			link: '/freelancer',
			linkDescription: '바로가기',
		},
	];

	return (
		<Wrapper justify='flex-start' direction='column' gap={2}>
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
	padding-right: 0;
	padding-left: 0;
`;

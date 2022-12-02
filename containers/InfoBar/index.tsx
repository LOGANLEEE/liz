import { Card, Grid, Spacer, Text } from '@nextui-org/react';
import { memo } from 'react';
import styled from 'styled-components';

type InfoBarProps = {
	postCount: number;
	targetSiteCount: number;
};
export const InfoBar = memo(({ postCount, targetSiteCount }: InfoBarProps) => {
	return (
		<Wrapper>
			<Grid.Container justify='flex-start'>
				<Grid xs sm md lg xl>
					<InfoCard count={postCount} title='최근 동작 시점' titleInfo='22년 10월 6일 16시 00분' suffix='개' />
				</Grid>
				<Spacer x={1} />
				<Grid xs sm md lg xl>
					<InfoCard count={targetSiteCount} titleInfo='대상 커뮤니티' suffix='군데' />
				</Grid>
				<Spacer x={1} />
				<Grid xs sm md lg xl>
					<InfoCard count={targetSiteCount} titleInfo='대상 커뮤니티' suffix='군데' />
				</Grid>
				{/* <Grid xs={4} sm={4} md={4} lg={4} xl={4}>
					<InfoCard count={209} title='' titleInfo='' />
				</Grid> */}
			</Grid.Container>
		</Wrapper>
	);
});

InfoBar.displayName = 'InfoBar';

const Wrapper = styled(Grid.Container)`
	width: 100%;
`;

type InfoCardProps = {
	title?: string;
	titleInfo?: string;
	count?: number;
	suffix?: string;
};
export const InfoCard = memo(({ count, title, titleInfo, suffix }: InfoCardProps) => {
	return (
		<InfoCardWrapper variant='bordered'>
			<Card.Header className='header'>
				<Text className='title' size={10} weight='bold' transform='uppercase' color='white'>
					{title}
				</Text>
				<Text className='title-info' size={14} weight='bold' transform='uppercase' color='white'>
					{titleInfo}
				</Text>
				<Text className='count' size={20} weight='bold' transform='uppercase' color='white'>
					{count} {suffix}
				</Text>
			</Card.Header>
			{/* <Card.Image src='/images/card1.jpg' objectFit='cover' width='100%' height={200} alt='Card image background' /> */}
		</InfoCardWrapper>
	);
});

InfoCard.displayName = 'InfoCard';

const InfoCardWrapper = styled(Card)`
	background-color: #424944;

	.header {
		/* justify-content: flex-end; */
		display: flex;
		flex-direction: column;
		p {
			width: 100%;
		}

		.title {
			text-align: start;
		}
		,
		.title-info {
			text-align: end;
		}
		.count {
			text-align: start;
		}
	}
`;

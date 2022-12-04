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
	prefix?: string;
};
export const InfoCard = memo(({ count, title, titleInfo, suffix, prefix }: InfoCardProps) => {
	return (
		<InfoCardWrapper direction='column'>
			{title && (
				<Grid>
					<Text className='title' size={12} weight='bold' transform='uppercase' color='white'>
						{title}
					</Text>
				</Grid>
			)}
			{titleInfo && (
				<Grid className='info'>
					<Text size={12} weight='bold' transform='uppercase' color='white'>
						{titleInfo}
					</Text>
				</Grid>
			)}
			<Grid>
				<Text className='count' size={16} weight='bold' transform='uppercase' color='white'>
					{prefix} {count} {suffix}
				</Text>
			</Grid>
		</InfoCardWrapper>
	);
});

InfoCard.displayName = 'InfoCard';

const InfoCardWrapper = styled(Grid.Container)`
	background-color: #424944;
	border-radius: 20px;
	padding: 20px;
	height: 100%;

	.info {
		text-align: end;
	}
`;

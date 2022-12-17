import { Grid, Spacer, Text } from '@nextui-org/react';
import type { api_log } from '@prisma/client';
import { format } from 'date-fns';
import { memo } from 'react';
import styled from 'styled-components';

type Props = {
	postCount: number;
	targetSiteCount: number;
	recentAccessLog?: api_log;
};
const InfoText = memo(({ postCount, targetSiteCount, recentAccessLog }: Props) => {
	return (
		<Wrapper justify='flex-start' gap={0.5} direction='column'>
			{recentAccessLog?.create_date && (
				<Grid xs sm md lg xl>
					<Text>마지막으로 </Text>
					<Spacer x={0.2} />
					<Text color='primary'>{format(new Date(recentAccessLog?.create_date), `MM월 dd일  HH시mm분ss초`)}</Text>
					<Spacer x={0.2} />
					<Text> 에 동작했어요.</Text>
				</Grid>
			)}
			{!recentAccessLog?.create_date && (
				<Grid xs sm md lg xl>
					<Text>매 </Text>
					<Spacer x={0.2} />
					<Text color='primary'>60분</Text>
					<Spacer x={0.2} />
					<Text>마다 동작할 예정이에요.</Text>
				</Grid>
			)}
			<Grid xs sm md lg xl>
				<Text>총</Text>
				<Spacer x={0.2} />
				<Text color='primary'>{targetSiteCount}</Text>
				<Spacer x={0.2} />
				<Text>군데에서</Text>
				<Spacer x={0.2} />
				<Text color='primary'>{postCount}</Text>
				<Spacer x={0.2} />
				<Text>개의 게시물을 긁어왔어요!</Text>
			</Grid>
		</Wrapper>
	);
});

InfoText.displayName = 'InfoText';
export default InfoText;

const Wrapper = styled(Grid.Container)`
	background-color: #193631;
	border-radius: 10px;
	/* width: 100%; */
`;

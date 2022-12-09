import { Grid, Progress } from '@nextui-org/react';
import { _axios } from 'lib/axiosInstance';
import type { ServerState } from 'lib/util';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

export const TopNavigationBar = () => {
	const [currentServerState, setCurrentServerState] = useState<ServerState>();

	const callStatusAPI = useCallback(async () => {
		const result: ServerState = await _axios(`${process.env.NEXT_PUBLIC_STATE_URL}/api/crawl/status`).then((res) => res?.data);
		setCurrentServerState(result);
		return result;
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			callStatusAPI();
		}, 1000 * 10);

		return () => {
			clearInterval(intervalId);
		};
	}, [callStatusAPI]);

	return (
		<Wrapper justify='center'>
			{currentServerState?.isCrawling && (
				<Grid xs={11} sm={1} md={11} lg={11} xl={11} justify='center' direction='column'>
					<p>데이터를 수집 중 입니다.</p>
					<Progress indeterminated value={30} shadow color='success' />
				</Grid>
			)}
		</Wrapper>
	);
};

const Wrapper = styled(Grid.Container)``;

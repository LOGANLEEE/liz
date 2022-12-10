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
		callStatusAPI();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			callStatusAPI();
		}, 1000 * 8);

		return () => {
			clearInterval(intervalId);
		};
	}, [callStatusAPI]);

	return (
		<Wrapper justify='center' direction='row' gap={0.5}>
			{currentServerState?.isCrawling && (
				<Grid xs={11.5} sm={11.5} md={11.5} lg={11.5} xl={11.5}>
					<Grid.Container direction='row' justify='center'>
						<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
							<p>데이터를 수집 중 입니다.</p>
						</Grid>
						<Grid xs={12} sm={12} md={12} lg={12} xl={12} justify='center'>
							<Progress indeterminated value={30} shadow color='success' />
						</Grid>
					</Grid.Container>
				</Grid>
			)}
		</Wrapper>
	);
};

const Wrapper = styled(Grid.Container)`
	width: 100%;
`;

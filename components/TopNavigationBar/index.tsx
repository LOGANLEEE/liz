import { Grid, Navbar, Progress, Text } from '@nextui-org/react';
import { _axios } from 'lib/axiosInstance';
import type { ServerState } from 'lib/util';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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

	const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	const triplet = (e1: number, e2: number, e3: number) =>
		keyStr.charAt(e1 >> 2) +
		keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
		keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
		keyStr.charAt(e3 & 63);

	const rgbDataURL = (r: number, g: number, b: number) =>
		`data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

	return (
		<>
			<Navbar isBordered variant='sticky'>
				<Navbar.Brand>
					{/* <AcmeLogo /> */}
					<Image
						src='/images/l.jpg'
						placeholder='blur'
						blurDataURL={rgbDataURL(237, 181, 6)}
						alt='Picture of the author'
						width={50}
						height={50}
					/>
					{/* <Text b color='inherit'>
						L
					</Text> */}
				</Navbar.Brand>
				<Navbar.Content>
					<Navbar.Link isActive href='/'>
						Community
					</Navbar.Link>
					<Navbar.Link href='/freelancer'>Freelancer</Navbar.Link>
					<Navbar.Link href='/about'>About</Navbar.Link>
				</Navbar.Content>
				{/* <Navbar.Content>
					<Navbar.Link color='inherit' href='#'>
						Login
					</Navbar.Link>
					<Navbar.Item>
						<Button auto flat as={Link} href='#'>
							Sign Up
						</Button>
					</Navbar.Item>
				</Navbar.Content> */}
			</Navbar>

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
		</>
	);
};

const Wrapper = styled(Grid.Container)`
	width: 100%;
`;

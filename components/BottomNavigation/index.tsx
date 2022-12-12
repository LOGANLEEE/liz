import { Grid, Navbar } from '@nextui-org/react';
import Image from 'next/image';
import { useCallback } from 'react';
import styled from 'styled-components';

const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const BottomNavigation = () => {
	const triplet = useCallback(
		(e1: number, e2: number, e3: number) =>
			keyStr.charAt(e1 >> 2) +
			keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
			keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
			keyStr.charAt(e3 & 63),

		[]
	);

	const rgbDataURL = useCallback(
		(r: number, g: number, b: number) =>
			`data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`,
		[triplet]
	);

	return (
		<Wrapper>
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
					{/* <Navbar.Item>Community</Navbar.Item> */}
					{/* <Navbar.Link isActive href='/#'>
						Community
					</Navbar.Link>
					<Navbar.Link className='test' href='/freelancer'>
						Freelancer
					</Navbar.Link>
					<Navbar.Link href='/about'>About</Navbar.Link> */}
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
		</Wrapper>
	);
};
const Wrapper = styled(Grid.Container)`
	width: 100%;
`;

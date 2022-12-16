import { Grid, Navbar, Text } from '@nextui-org/react';
import { rgbDataURL } from 'lib/util/imageLoader';
import Image from 'next/image';
import styled from 'styled-components';

type Props = {};
export const NavigationBar = () => {
	return (
		<Navbar isBordered variant='sticky' maxWidth={'fluid'}>
			<Wrapper direction='row'>
				<Grid>
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
						<Text b color='inherit'>
							PROTAGONIST
						</Text>
					</Navbar.Brand>
				</Grid>

				<Grid>
					<Navbar.Content>
						<Navbar.Link
							// isActive
							href='/'
						>
							Community
						</Navbar.Link>

						<Navbar.Link href='/freelancer'>Freelancer</Navbar.Link>
						<Navbar.Link href='/about'>About</Navbar.Link>
					</Navbar.Content>
				</Grid>
			</Wrapper>
		</Navbar>
	);
};
const Wrapper = styled(Grid.Container)``;

export default NavigationBar;

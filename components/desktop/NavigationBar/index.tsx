import { Button, Grid, Navbar, Spacer, Text } from '@nextui-org/react';
import { ThemeToggleButton } from 'components/ThemeToggleButton';
import Image from 'next/image';
import styled from 'styled-components';

type Props = {};
export const NavigationBar = () => {
	return (
		<Navbar isBordered variant='sticky' maxWidth={'fluid'}>
			<Wrapper direction='row'>
				<Grid sm={2}>
					<Navbar.Brand>
						<Image className='logo' src='/images/illuminati.svg' alt='Picture of the author' width={50} height={50} />
						<Spacer x={1} />
						<Text b color='inherit'>
							PROTAGONIST
						</Text>
					</Navbar.Brand>
				</Grid>

				<Grid sm={8} justify='center'>
					<Navbar.Content>
						<Navbar.Link
							// isActive
							href='/community'
						>
							Community
						</Navbar.Link>

						<Navbar.Link href='/freelancer'>Freelancer</Navbar.Link>
						<Navbar.Link href='/about'>About</Navbar.Link>
					</Navbar.Content>
				</Grid>

				<Grid sm={2} justify='flex-end'>
					<Navbar.Content>
						{/* <Navbar.Link color='inherit' href='#'>
							button
						</Navbar.Link> */}
						<Navbar.Item>
							<Button
								className='toggle-button'
								auto
								icon={<ThemeToggleButton isDark fill='currentColor' filled size={26} />}
							/>
						</Navbar.Item>
					</Navbar.Content>
				</Grid>
			</Wrapper>
		</Navbar>
	);
};

const Wrapper = styled(Grid.Container)`
	.logo {
		filter: drop-shadow(16px 16px 20px red) invert(75%);
	}
	.toggle-button {
		background-color: transparent;

		/* width: 100%; */
		height: 100%;
	}
`;

export default NavigationBar;

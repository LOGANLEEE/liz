import { Button, Grid, Navbar } from '@nextui-org/react';
import { ThemeToggleButton } from 'components/ThemeToggleButton';
import { NavigationItems } from 'lib/util';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';

type Props = {};
export const MobileNavigationBar = () => {
	const toggleRef = useRef<HTMLButtonElement>(null);

	const onClickToggle = useCallback(() => {
		toggleRef.current?.click();
	}, []);

	return (
		<Navbar isBordered variant='sticky' maxWidth={'fluid'} height={50}>
			<Wrapper direction='row' gap={0.5} justify='flex-start'>
				<Grid className='item' xs={2}>
					<Navbar.Brand className='brand' onClick={() => (window.location.href = '/')}>
						<Image
							className='logo'
							src='/images/illuminati.svg'
							alt='Picture of the symbol'
							width={50}
							height={48}
							// placeholder='blur'
							// blurDataURL={rgbDataURL(237, 181, 6)}
						/>
					</Navbar.Brand>
				</Grid>
				<Grid className='item' xs={7} justify='center'></Grid>

				<Grid className='item' xs={3} justify='space-between'>
					<Navbar.Content>
						<Navbar.Item>
							<Button
								className='toggle-button'
								auto
								color='error'
								icon={<ThemeToggleButton isDark fill='currentColor' filled size={26} />}
							/>
						</Navbar.Item>
						<Navbar.Item>
							<Navbar.Toggle ref={toggleRef} className='toggle-button' />
						</Navbar.Item>
					</Navbar.Content>
				</Grid>
			</Wrapper>
			<StyledCollapse>
				{NavigationItems.map(({ href, name }, index) => (
					<Navbar.CollapseItem key={name}>
						<Link className='link' color='primary' href={href} onClick={onClickToggle}>
							{name}
						</Link>
					</Navbar.CollapseItem>
				))}
			</StyledCollapse>
		</Navbar>
	);
};

const StyledCollapse = styled(Navbar.Collapse)`
	.link {
		width: 100%;
		text-align: end;
	}
`;
const Wrapper = styled(Grid.Container)`
	z-index: 201;
	margin: 0;
	padding: 0;

	.logo {
		filter: drop-shadow(16px 16px 20px red) invert(75%);
	}

	.item {
		padding-top: 0;
		padding-bottom: 0;
	}

	.toggle-button {
		background-color: transparent;

		/* width: 100%; */
		height: 100%;
	}
`;

export default MobileNavigationBar;

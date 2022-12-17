import { Grid, Navbar } from '@nextui-org/react';
import { NavigationItems } from 'lib/util';
import { rgbDataURL } from 'lib/util/imageLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {};
export const MobileNavigationBar = () => {
	const [isToggled, setIsToggled] = useState(false);

	return (
		<Navbar isBordered variant='sticky' maxWidth={'fluid'} height={40}>
			<Wrapper direction='row' gap={1} justify='center'>
				<Grid className='item' xs={1}></Grid>
				<Grid className='item' xs={10} justify='center'>
					<Navbar.Brand onClick={() => (window.location.href = '/')}>
						{/* <AcmeLogo /> */}
						<Image
							src='/images/l.jpg'
							// src='/images/l.svg'
							placeholder='blur'
							blurDataURL={rgbDataURL(237, 181, 6)}
							alt='Picture of the symbol'
							width={38}
							height={38}
						/>
					</Navbar.Brand>
				</Grid>

				<Grid className='item' xs={1}>
					<Navbar.Toggle
						isSelected={isToggled}
						className='toggle-button'
						onChange={(isSelected) => {
							if (typeof isSelected === 'boolean') {
								setIsToggled(isSelected);
							}
						}}
					/>
				</Grid>
			</Wrapper>
			{isToggled && (
				<StyledCollapse>
					{NavigationItems.map(({ href, name }, index) => (
						<Navbar.CollapseItem key={name}>
							<Link className='link' color='primary' href={href} onClick={() => setIsToggled(false)}>
								{name}
							</Link>
						</Navbar.CollapseItem>
					))}
				</StyledCollapse>
			)}
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

	.item {
		padding-top: 0;
		padding-bottom: 0;
	}

	.toggle-button {
		width: 38px;
		height: 38px;
	}
`;

export default MobileNavigationBar;

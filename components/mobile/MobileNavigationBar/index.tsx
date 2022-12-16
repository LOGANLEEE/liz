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
	console.log('isToggled:', isToggled);

	return (
		<Navbar isBordered variant='sticky' maxWidth={'fluid'}>
			<Wrapper direction='row' gap={1} justify='flex-start'>
				<Grid>
					<Navbar.Toggle
						className='toggle-button'
						onChange={(isSelected) => {
							if (typeof isSelected === 'boolean') {
								setIsToggled(isSelected);
							}
						}}
					/>
				</Grid>
				<Grid>
					<Navbar.Brand onClick={() => (window.location.href = '/')}>
						{/* <AcmeLogo /> */}
						<Image
							src='/images/l.jpg'
							placeholder='blur'
							blurDataURL={rgbDataURL(237, 181, 6)}
							alt='Picture of the author'
							width={40}
							height={40}
						/>
					</Navbar.Brand>
				</Grid>

				{/* <Grid>
					<Navbar.Content>
					</Navbar.Content>
				</Grid> */}
			</Wrapper>
			{isToggled && (
				<Navbar.Collapse>
					{NavigationItems.map(({ href, name }, index) => (
						<Navbar.CollapseItem key={name}>
							<Link color='inherit' href={href} onClick={() => setIsToggled(false)}>
								{name}
							</Link>
						</Navbar.CollapseItem>
					))}
				</Navbar.Collapse>
			)}
		</Navbar>
	);
};
const Wrapper = styled(Grid.Container)`
	z-index: 201;
	.toggle-button {
		width: 30px;
		height: 30px;
	}
`;

export default MobileNavigationBar;

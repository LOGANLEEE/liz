import { Grid, Text } from '@nextui-org/react';
import styled from 'styled-components';

const Footer = () => {
	return (
		<Wrapper>
			<Grid.Container xs sm md lg xl direction='row' justify='center' gap={1} className='container'>
				<Grid className='item1'>
					<Text className='copy-right'>Copyright © {new Date().getFullYear()} LOGAN LEE. All rights reserved.</Text>
				</Grid>
			</Grid.Container>
		</Wrapper>
	);
};

const Wrapper = styled.footer`
	height: 100px;
	display: flex;

	background: linear-gradient(to bottom, #132020, #123029);

	.item1 {
		margin-top: auto;
	}
	.copy-right {
		text-align: center;
	}
	.container {
		margin-bottom: 0;
	}
`;

export default Footer;

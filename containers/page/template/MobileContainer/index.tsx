import { Grid } from '@nextui-org/react';
import styled from 'styled-components';

type Props = { some?: string };

const MobileContainer = ({ some }: Props) => {
	return (
		<Wrapper direction='row' justify='center' gap={1}>
			<Grid xs sm md lg xl>
				MobileContainer
			</Grid>
		</Wrapper>
	);
};

export default MobileContainer;

const Wrapper = styled(Grid.Container)``;

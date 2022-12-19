import { Grid } from '@nextui-org/react';
import styled from 'styled-components';

type Props = { some?: string };

const DesktopContainer = ({ some }: Props) => {
	return (
		<Wrapper justify='center' direction='row' gap={1}>
			<Grid xs sm md lg xl>
				DesktopContainer
			</Grid>
		</Wrapper>
	);
};
const Wrapper = styled(Grid.Container)``;
export default DesktopContainer;

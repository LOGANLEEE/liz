import { Grid } from '@nextui-org/react';

type Props = { some?: string };

const MobileContainer = ({ some }: Props) => {
	return (
		<Grid.Container justify='center' direction='row' gap={1}>
			<Grid>LADNING PAGE</Grid>
		</Grid.Container>
	);
};

export default MobileContainer;

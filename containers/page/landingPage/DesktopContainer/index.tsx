import { Grid } from '@nextui-org/react';

type Props = { some?: string };

const DesktopContainer = ({ some }: Props) => {
	return (
		<Grid.Container justify='center' direction='row' gap={1}>
			<Grid>LADNING PAGE</Grid>
		</Grid.Container>
	);
};

export default DesktopContainer;

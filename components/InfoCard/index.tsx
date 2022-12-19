import { Card, Grid, Link, Text } from '@nextui-org/react';
import styled from 'styled-components';

type Props = {
	header?: string;
	subHeader?: string;
	body: string;
	link?: string;
	linkDescription?: string;
};
const InfoCard = ({ body, header, link = '/#', linkDescription, subHeader }: Props) => {
	return (
		<Wrapper>
			<Grid xs sm md lg xl>
				<Card>
					<Card.Header>
						<Grid.Container css={{ pl: '$6' }}>
							{header && (
								<Grid xs={12}>
									<Text h4 css={{ lineHeight: '$xs' }}>
										{header}
									</Text>
								</Grid>
							)}
							{subHeader && (
								<Grid xs={12}>
									<Text css={{ color: '$accents8' }}>{subHeader}</Text>
								</Grid>
							)}
						</Grid.Container>
					</Card.Header>
					<Card.Body>
						<Text>{body}</Text>
					</Card.Body>
					<Card.Footer>
						<Link
							// icon
							color='primary'
							// target='_blank'
							href={link}
						>
							{linkDescription}
						</Link>
					</Card.Footer>
				</Card>
			</Grid>
		</Wrapper>
	);
};

const Wrapper = styled(Grid.Container)`
	width: 100%;
	height: 100%;
`;

export default InfoCard;

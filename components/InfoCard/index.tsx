import { Card, Grid, Link, Text } from '@nextui-org/react';
import { isValidElement, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
	header?: string | ReactNode;
	subHeader?: string | ReactNode;
	body: string | ReactNode;
	link?: string;
	linkDescription?: string | ReactNode;
};
const InfoCard = ({ body, header, link = '/#', linkDescription, subHeader }: Props) => {
	return (
		<Wrapper>
			<Grid xs sm md lg xl>
				<Card>
					<Card.Header>
						<Grid.Container>
							{header && (
								<Grid xs={12}>
									<Text h4>{header}</Text>
								</Grid>
							)}
							{subHeader && (
								<Grid xs={12}>
									<Text>{subHeader}</Text>
								</Grid>
							)}
						</Grid.Container>
					</Card.Header>
					<Card.Body>
						{typeof body === 'string' && <Text>{body}</Text>}
						{isValidElement(body) && body}
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

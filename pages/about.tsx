import { Text } from '@nextui-org/react';
import type { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';

const About = () => {
	return (
		<Wrapper>
			<Text h1>준비 중 입니다.</Text>
		</Wrapper>
	);
};

export default About;

const Wrapper = styled.div`
	height: 100%;
`;

function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {}, // will be passed to the page component as props
	};
}

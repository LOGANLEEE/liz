import { Text } from '@nextui-org/react';
import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';

const About = () => {
	<Wrapper>
		<Text h1>준비 중 입니다.</Text>
	</Wrapper>;
};

export default About;

const Wrapper = styled.main`
	width: 100vw;
	height: 100vh;
`;

function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {}, // will be passed to the page component as props
	};
}

import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';

const About = () => {
	<Wrapper>about</Wrapper>;
};

export default About;

const Wrapper = styled.main``;

function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {}, // will be passed to the page component as props
	};
}

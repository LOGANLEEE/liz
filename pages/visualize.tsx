import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';

// const MobileContainer = dynamic(() => import('containers/page/landingPage/MobileContainer'), {});
// const DesktopContainer = dynamic(() => import('containers/page/landingPage/DesktopContainer'), {});

type Props = {
	some?: unknown;
};
const visualize = ({ some }: Props) => {
	return <Wrapper>visualize</Wrapper>;
};
const Wrapper = styled.div``;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	return {
		props: {}, // will be passed to the page component as props
	};
}
export default visualize;

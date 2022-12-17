import { InfoProvider } from 'components/InfoProvider';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';
import { Footer } from 'components/Footer';
import { GetServerSidePropsContext } from 'next';

const NavigationBar = dynamic(() => import('components/desktop/NavigationBar'), { ssr: false });
const MobileNavigationBar = dynamic(() => import('components/mobile/MobileNavigationBar'), { ssr: false });

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Wrapper>
			{!isMobile && <NavigationBar />}
			{isMobile && <MobileNavigationBar />}
			<InfoProvider />
			{children}
			<Footer />
		</Wrapper>
	);
};

export const Wrapper = styled.div`
	height: 100%;
	box-sizing: 'border-box';
`;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	return {
		props: {},
	};
}

import { InfoProvider } from 'components/InfoProvider';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';
import { Footer } from 'components/Footer';
import { GetServerSidePropsContext } from 'next';

const NavigationBar = dynamic(() => import('components/Desktop/NavigationBar'), { ssr: false });
const MobileNavigationBar = dynamic(() => import('components/Mobile/MobileNavigationBar'), { ssr: false });

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Wrapper>
			{!isMobile && <NavigationBar />}
			{isMobile && <MobileNavigationBar />}
			<InfoProvider />
			<div style={{ minHeight: '100vh' }}>{children}</div>
			<Footer />
		</Wrapper>
	);
};

export const Wrapper = styled.div`
	min-height: 100%;
	width: 100%;
`;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
	return {
		props: {},
	};
}

import type { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

const NavigationBar = dynamic(() => import('components/Desktop/NavigationBar'), { ssr: true });
const MobileNavigationBar = dynamic(() => import('components/Mobile/MobileNavigationBar'), { ssr: true });
const InfoProvider = dynamic(() => import('components/InfoProvider'), { ssr: true });
const Footer = dynamic(() => import('components/Footer'), { ssr: true });

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Script
				async
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3039415986725164'
				crossOrigin='anonymous'
			/>
			<Wrapper>
				{!isMobile && <NavigationBar />}
				{isMobile && <MobileNavigationBar />}
				<InfoProvider />
				<div style={{ minHeight: '100vh' }}>{children}</div>
				<Footer />
			</Wrapper>
		</>
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

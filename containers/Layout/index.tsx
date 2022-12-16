import { NavigationBar } from 'components/NavigationBar';
import { InfoProvider } from 'components/InfoProvider';
import type { ReactNode } from 'react';
import styled from 'styled-components';

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Wrapper>
			<InfoProvider />
			<NavigationBar />
			<main>{children}</main>
		</Wrapper>
	);
};

export const Wrapper = styled.div`
	box-sizing: 'border-box';
`;

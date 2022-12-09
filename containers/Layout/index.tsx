import { TopNavigationBar } from 'components/TopNavigationBar';
import type { ReactNode } from 'react';
import styled from 'styled-components';

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Wrapper>
			<TopNavigationBar />
			<main>{children}</main>
		</Wrapper>
	);
};

export const Wrapper = styled.div`
	box-sizing: 'border-box';
`;

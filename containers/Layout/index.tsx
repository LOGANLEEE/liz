import { InfoProvider } from 'components/InfoProvider';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';

const NavigationBar = dynamic(() => import('components/desktop/NavigationBar'), { ssr: false });
const MobileNavigationBar = dynamic(() => import('components/mobile/MobileNavigationBar'), { ssr: false });

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Wrapper>
			<InfoProvider />
			{!isMobile && <NavigationBar />}
			{isMobile && <MobileNavigationBar />}
			<main>{children}</main>
		</Wrapper>
	);
};

export const Wrapper = styled.div`
	box-sizing: 'border-box';
`;

// import { Navbar, Button, Link, Text } from '@nextui-org/react';

// function App() {
// 	const collapseItems = ['Features', 'Customers', 'Pricing', 'Company', 'Legal', 'Team', 'Help & Feedback', 'Login', 'Sign Up'];

// 	return (
// 		<>
// 			<Navbar isBordered variant='sticky'>
// 				<Navbar.Brand>
// 					<Navbar.Toggle aria-label='toggle navigation' />
// 					<Text b color='inherit' hideIn='xs'>
// 						ACME
// 					</Text>
// 				</Navbar.Brand>
// 				<Navbar.Content enableCursorHighlight hideIn='xs' variant='underline'>
// 					<Navbar.Link href='#'>Features</Navbar.Link>
// 					<Navbar.Link isActive href='#'>
// 						Customers
// 					</Navbar.Link>
// 					<Navbar.Link href='#'>Pricing</Navbar.Link>
// 					<Navbar.Link href='#'>Company</Navbar.Link>
// 				</Navbar.Content>
// 				<Navbar.Content>
// 					<Navbar.Link color='inherit' href='#'>
// 						Login
// 					</Navbar.Link>
// 					<Navbar.Item>
// 						<Button auto flat as={Link} href='#'>
// 							Sign Up
// 						</Button>
// 					</Navbar.Item>
// 				</Navbar.Content>
// 				<Navbar.Collapse>
// 					{collapseItems.map((item, index) => (
// 						<Navbar.CollapseItem key={item}>
// 							<Link
// 								color='inherit'
// 								css={{
// 									minWidth: '100%',
// 								}}
// 								href='#'
// 							>
// 								{item}
// 							</Link>
// 						</Navbar.CollapseItem>
// 					))}
// 				</Navbar.Collapse>
// 			</Navbar>
// 		</>
// 	);
// }

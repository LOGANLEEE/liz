import { createTheme, NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

import { Layout } from 'containers/Layout';
import { ThemeProvider } from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
	// 2. Call `createTheme` and pass your custom values
	const theme = createTheme({
		type: 'dark', // it could be "light" or "dark"
		theme: {
			colors: {
				// brand colors
				primaryLight: '$green200',
				primaryLightHover: '$green300',
				primaryLightActive: '$green400',
				primaryLightContrast: '$green600',
				primary: '#4ADE7B',
				// primary: '#27254b',

				primaryBorder: '$green500',
				primaryBorderHover: '$green600',
				primarySolidHover: '$green700',
				primarySolidContrast: '$white',
				primaryShadow: '$green500',

				gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
				link: '#5E1DAD',

				// you can also create your own color
				myColor: '#ff4ecd',
				secondary: '#173633',

				// ...  more colors
			},
			space: {},
			fonts: {},
		},
	});

	return (
		<NextUIProvider theme={theme}>
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</NextUIProvider>
	);
}

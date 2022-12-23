import { CssBaseline } from '@nextui-org/react';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: [initialProps.styles, sheet.getStyleElement()],
			};
		} finally {
			sheet.seal();
		}
	}
	render() {
		return (
			<Html lang='en'>
				<Head>
					{CssBaseline.flush()}
					<Script
						async
						src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3039415986725164'
						crossOrigin='anonymous'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		console.log(process.env.NEXT_PUBLIC_MODE);
	}, []);

	return (
		<div>
			<Head>
				<title>Seize what you want without NO LIMIT.</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<div>HOME AND MAIN</div>
			</main>

			<footer>
				<a
					href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					<span>
						<Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}

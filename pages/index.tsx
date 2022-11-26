import { Grid } from '@nextui-org/react';
import { fresh_post } from '@prisma/client';
import { InfoBar } from 'containers/InfoBar';
import { PostContainer } from 'containers/PostContainer';
import { getFreshPost } from 'lib/crawl/logic/post';
import Head from 'next/head';
import Image from 'next/image';

type Props = {
	posts: fresh_post[];
};

console.log('mode:', process.env.NEXT_PUBLIC_MODE);

const Home = ({ posts }: Props) => {
	return (
		<div>
			<Head>
				<title>Seize what you want without NO LIMIT.</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>

			<main>
				<Grid.Container justify='center' direction='row'>
					<Grid xs={0} sm={2} xl={1.5}>
						left
					</Grid>
					<Grid xs={12} sm={8} xl={9}>
						<Grid.Container gap={2} justify='center' direction='row'>
							<InfoBar postCount={posts?.length} targetSiteCount={1} />
							<PostContainer posts={posts} />
						</Grid.Container>
					</Grid>
					<Grid xs={0} sm={2} xl={1.5}>
						right
					</Grid>
				</Grid.Container>
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
};
export default Home;

export async function getServerSideProps() {
	// Call an external API endpoint to get posts.
	// You can use any data fetching library
	const posts = await getFreshPost();
	// By returning { props: { posts } }, the Blog component
	// will receive `posts` as a prop at build time
	return {
		props: {
			posts,
		},
	};
}

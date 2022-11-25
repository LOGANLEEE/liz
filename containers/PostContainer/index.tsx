import { fresh_post } from '@prisma/client';
import Post from 'components/Post';

declare type Props = {
	posts: fresh_post[];
};
export const PostContainer = ({ posts }: Props) => {
	return (
		<div>
			{posts.map((data) => (
				<Post key={data.id} data={data} />
			))}{' '}
		</div>
	);
};

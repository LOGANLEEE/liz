import { fresh_post } from '@prisma/client';
import Post from 'components/Post';
import styled from 'styled-components';

declare type Props = {
	posts: fresh_post[];
};
export const PostContainer = ({ posts }: Props) => {
	return (
		<Wrapper>
			{posts.map((data) => (
				<Post key={data.id} data={data} />
			))}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
`;

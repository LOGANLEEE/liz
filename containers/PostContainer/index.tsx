import { fresh_post } from '@prisma/client';
import Post from 'components/Post';
import { memo } from 'react';
import styled from 'styled-components';

declare type Props = {
	posts?: fresh_post[];
};
export const PostContainer = memo(({ posts }: Props) => {
	return (
		<Wrapper>
			{posts?.map((data) => (
				<Post key={data.id} data={data} />
			))}
		</Wrapper>
	);
});

PostContainer.displayName = 'PostContainer';
const Wrapper = styled.ul`
	width: 100%;
`;

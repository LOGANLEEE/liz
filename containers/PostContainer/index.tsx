import { Button } from '@nextui-org/react';
import type { fresh_post } from '@prisma/client';
import Post from 'components/Post';
import { delay } from 'lib/util';
import { memo, useCallback, useEffect, useState } from 'react';
import { isSafari, isMobileSafari } from 'react-device-detect';
import styled from 'styled-components';
import { VisitedList } from 'types';

declare type Props = {
	posts?: fresh_post[];
};
const PostContainer = memo(({ posts = [] }: Props) => {
	const [showButton, setShowButton] = useState(false);
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		if (isSafari && !isMobileSafari) {
			setShowButton(true);
		}
	}, []);

	const openPosts = useCallback(async () => {
		setClicked(true);
		if (showButton) {
			const visitedList: VisitedList = JSON.parse(localStorage.getItem('visitedIdList') || '[]');

			for (const { post, idx } of posts.map((post, idx) => ({ idx, post }))) {
				if (post.link) {
					const visited = visitedList.find(({ title }) => post.title === title);
					if (visited) continue;
					if (idx % 5 === 0) await delay(1);
					window.open(post.link, '');
					visitedList.push({ id: post?.id, title: post?.title || undefined, name: post.name || '' });
				}
			}
			localStorage.setItem('visitedIdList', JSON.stringify(visitedList));
		}
		setClicked(false);
	}, [posts, showButton]);

	return (
		<Wrapper>
			{posts && showButton && (
				<Button shadow rounded bordered onClick={openPosts} size={'xs'} onKeyDown={(e) => console.log(e.key)}>
					안읽은 글 모두 열기
				</Button>
			)}
			{posts?.map((data) => (
				<Post key={data.id} data={data} clicked={clicked} />
			))}
		</Wrapper>
	);
});

export default PostContainer;

PostContainer.displayName = 'PostContainer';
const Wrapper = styled.ul`
	width: 100%;
`;

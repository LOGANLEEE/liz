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
export const PostContainer = memo(({ posts = [] }: Props) => {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		if (isSafari && !isMobileSafari) {
			setShowButton(true);
		}
	}, []);

	// todo 실행 후 실시간 반영 안됨
	const openPosts = useCallback(async () => {
		if (showButton) {
			const visitedList: VisitedList = JSON.parse(localStorage.getItem('visitedIdList') || '[]');

			for (const { post, idx } of posts.map((post, idx) => ({ idx, post }))) {
				if (post.link) {
					if (idx % 5 === 0) await delay(500);
					const child = window.open(post.link, '');
					child?.blur();
					window.focus();
					visitedList.push({ id: post?.id, title: post?.title || undefined, name: post.name || '' });
				}
			}

			localStorage.setItem('visitedIdList', JSON.stringify(visitedList));
		}
	}, [posts, showButton]);

	return (
		<Wrapper>
			{posts && showButton && (
				<Button shadow rounded bordered onClick={openPosts} size={'xs'}>
					모두 보기
				</Button>
			)}
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

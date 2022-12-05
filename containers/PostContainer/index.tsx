import { Button } from '@nextui-org/react';
import type { fresh_post } from '@prisma/client';
import Post from 'components/Post';
import { memo, useCallback, useEffect, useState } from 'react';
import { isSafari } from 'react-device-detect';
import styled from 'styled-components';
import { VisitedList } from 'types';

declare type Props = {
	posts?: fresh_post[];
};
export const PostContainer = memo(({ posts }: Props) => {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		if (isSafari) {
			setShowButton(true);
		}
	}, []);

	// todo 실행 후 실시간 반영 안됨
	const openPosts = useCallback(() => {
		if (showButton) {
			const visitedList: VisitedList = JSON.parse(localStorage.getItem('visitedIdList') || '[]');
			posts?.forEach(({ id, title, name, link }) => {
				link && window.open(link, '');
				return visitedList.push({ id, title: title || undefined, name: name || '' });
			});

			localStorage.setItem('visitedIdList', JSON.stringify(visitedList));
		}
	}, [posts, showButton]);

	return (
		<Wrapper>
			{showButton && (
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

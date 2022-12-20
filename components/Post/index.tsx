import { Grid, Text } from '@nextui-org/react';
import type { fresh_post } from '@prisma/client';
import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { VisitedList } from 'types';
import { numberFormat } from '../../lib/util';

type Props = {
	data: fresh_post;
	clicked: boolean;
};
const Post = memo(({ data, clicked }: Props) => {
	const [visited, setVisited] = useState(false);

	useEffect(() => {
		const visitedList: VisitedList = JSON.parse(localStorage.getItem('visitedIdList') || '[]');
		if (visitedList.length < 1) return;
		const target = visitedList.find(
			({ id, title, name }) => id === data.id || (title === data.title && name === data.name) || title === data.title
		);

		if (target?.id || target?.title) {
			setVisited(true);
		}
	}, [data.id, data.name, data.title, clicked]);

	const visitHandler = useCallback(() => {
		if (data.link) window.open(data.link);
		setVisited(true);
		const visitedList: VisitedList = JSON.parse(localStorage.getItem('visitedIdList') || '[]');
		visitedList.push({ id: data?.id, title: data?.title || undefined, name: data.name + '' });
		localStorage.setItem('visitedIdList', JSON.stringify(visitedList));
		return;
	}, [data?.id, data.link, data.name, data?.title]);

	return (
		<Wrapper onClick={visitHandler} className={`${visited ? 'visited' : ''}`}>
			<Grid.Container gap={1} justify='flex-start' direction='row'>
				<Grid xs={1.3} sm={1} md={0.5} className='name' justify='center'>
					<Text className='text'>{data.name}</Text>
				</Grid>
				<Grid xs={7.9} sm={9} md={10.5}>
					<Text className='title text'>{data.title}</Text>
				</Grid>
				{data.hit && (
					<Grid justify='flex-end' xs={2.8} sm={2} md={1}>
						<Text className='hit text'>🔥{numberFormat(data.hit)}</Text>
					</Grid>
				)}
			</Grid.Container>
		</Wrapper>
	);
});

Post.displayName = 'Post';
export default Post;

const Wrapper = styled.li`
	width: 100%;
	cursor: pointer;
	border: 0.5px #3d582f solid;
	border-radius: 8px;

	margin-bottom: 10px;

	.name {
		background-color: ${(props) => props?.theme?.colors?.secondary};
		border-radius: 8px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.title {
		padding-left: 1px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.hit {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	:hover {
		background-color: #4e2323;
	}

	:active {
		background-color: #602b2b;
	}

	.text {
		color: inherit;
	}

	&.visited {
		color: #645959 !important;
	}
`;

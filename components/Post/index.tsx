import { Grid, Link, Text } from '@nextui-org/react';
import type { fresh_post } from '@prisma/client';
import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { VisitedList } from 'types';
import { numberFormat } from '../../lib/util';

type Props = {
	data: fresh_post;
};
const Post = memo(({ data }: Props) => {
	const [visited, setVisited] = useState(false);

	useEffect(() => {
		const visitedList: VisitedList = JSON.parse(localStorage.getItem('visitedIdList') || '[]');
		if (visitedList.length < 1) return;
		const target = visitedList.find(({ id, title, name }) => id === data.id || (title === data.title && name === data.name));
		if (target?.id || target?.title) {
			setVisited(true);
		}
	}, [data.id, data.name, data.title]);

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
			<Grid.Container
				className='container'
				gap={1}
				justify='flex-start'
				// xs={10} sm={12}
				direction='row'
			>
				<Grid xs={1.2} sm={1} md={1} className='name'>
					<Text>{data.name}</Text>
				</Grid>
				<Grid xs={7.8} sm={8} md={10}>
					<Text className='title'>{data.title}</Text>
				</Grid>
				{data.hit && (
					<Grid xs={3} sm={3} md={1} justify='flex-end'>
						<Text className='hit'>🔥{numberFormat(data.hit)}</Text>
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
	.container {
		padding-right: 0;
		padding-left: 0;
	}

	.name {
		border-right: 0.5px solid;

		/* padding-right: 5px; */
		/* margin-right: 10px; */
	}

	.title {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.hit {
		/* text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap; */
	}

	:hover {
		background-color: #4e2323;
	}
	:active {
		background-color: #602b2b;
	}
	&.visited {
		color: #645959 !important;
	}
`;

// const Wrapper = styled.li`
// 	margin: 5px;
// 	padding: 10px;
// 	width: 100%;

// 	display: flex;
// 	flex-direction: row;
// 	cursor: pointer;
// 	border: 0.5px #3d582f solid;
// 	border-radius: 14px;

// 	.name {
// 		width: 10%;
// 		border-right: 0.5px solid;
// 		padding-right: 5px;
// 		margin-right: 10px;
// 	}
// 	.title {
// 		width: 80%;
// 	}

// 	.hit {
// 		width: 10%;
// 		text-align: end;
// 	}

// 	:hover {
// 		background-color: #4e2323;
// 	}
// 	:active {
// 		background-color: #602b2b;
// 	}
// 	&.visited {
// 		color: #645959 !important;
// 	}
// `;

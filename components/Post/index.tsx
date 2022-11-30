import type { fresh_post } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { VisitedList } from 'types';
import { numberFormat } from '../../lib/util';

type Props = {
	data: fresh_post;
};
const Post = ({ data }: Props) => {
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
		<Wrapper onClick={visitHandler} className={`title ${visited ? 'visited' : ''}`}>
			<li className='title'>
				<span className='name'>{data.name}</span>
				{data.title}
			</li>
			{/* {data?.author && <li className='author'>{data.author}</li>} */}
			{data.hit && <li className='hit'>🔥{numberFormat(data.hit)}</li>}
		</Wrapper>
	);
};
export default Post;

const Wrapper = styled.ul`
	margin: 5px;
	padding: 10px;

	display: flex;
	cursor: pointer;
	border: 0.5px #3d582f solid;
	border-radius: 14px;

	:hover {
		background-color: #4e2323;
	}
	:active {
		background-color: #602b2b;
	}
	&.visited {
		color: #645959 !important;
	}
	.title {
		display: flex;
		flex-direction: row;
		gap: 10px;
		.name {
			flex: auto;
			border-right: 0.5px solid;
			padding-right: 8px;
		}
	}

	.author {
		font-size: 10px;
		text-align: end;
		flex: auto;
	}
	.hit {
		text-align: end;
		flex: auto;
	}
`;

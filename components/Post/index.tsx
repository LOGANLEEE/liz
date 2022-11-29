import type { fresh_post } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { numberFormat } from '../../lib/util';

type Props = {
	data: fresh_post;
};
const Post = ({ data }: Props) => {
	const [visited, setVisited] = useState(false);
	useEffect(() => {
		const idList: number[] = JSON.parse(localStorage.getItem('visitedIdList') || '[]');
		if (idList.length < 1) return;
		if (idList.find((id) => id === data.id) || 0 > 0) setVisited(true);
	}, [data.id]);

	const visitHandler = useCallback(() => {
		if (data.link) window.open(data.link);
		const idxList: number[] = JSON.parse(localStorage.getItem('visitedIdList') || '[]');
		idxList.push(data?.id);
		localStorage.setItem('visitedIdList', JSON.stringify(idxList));
		setVisited(true);

		return;
	}, [data?.id, data.link]);

	return (
		<Wrapper onClick={visitHandler}>
			<li className={`title ${visited ? 'visited' : ''}`}>
				<span className='name'>{data.name}</span>
				{data.title}
			</li>
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
		background-color: #602b2b;
	}

	.title {
		&.visited {
			color: #645959;
		}

		display: flex;
		flex-direction: row;
		gap: 10px;
		.name {
			flex: auto;
		}
	}
	.hit {
		text-align: end;
		flex: auto;
	}
`;

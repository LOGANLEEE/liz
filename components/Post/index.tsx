import type { fresh_post } from '@prisma/client';
import styled from 'styled-components';
import { numberFormat } from '../../lib/util';

type Props = {
	data: fresh_post;
};
const Post = ({ data }: Props) => {
	return (
		<Wrapper onClick={() => data.link && window.open(data.link)}>
			<li className='title'>
				<span className='name'>{data.name}</span>
				{data.title}
			</li>
			{data.hit && <li className='hit'>{numberFormat(data.hit)}</li>}
		</Wrapper>
	);
};
export default Post;

const Wrapper = styled.ul`
	padding: 10px;
	display: flex;
	cursor: pointer;

	:hover {
		background-color: #602b2b;
	}

	.title {
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

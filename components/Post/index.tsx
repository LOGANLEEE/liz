import type { fresh_post } from '@prisma/client';
import styled from 'styled-components';
import { numberFormat } from '../../lib/util';

type Props = {
	data: fresh_post;
};
const Post = ({ data }: Props) => {
	return (
		<Wrapper onClick={() => window.open(data.link)}>
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

	li {
		/* flex: auto; */
		/* flex: 2 1 auto; */
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

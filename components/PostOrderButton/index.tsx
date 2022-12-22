import { Button } from '@nextui-org/react';
import { OrderBy } from 'lib/crawl/logic/post';
import styled from 'styled-components';

type Props = { orderByHit: OrderBy; toggleOrderByHit: () => void };
const PostOrderButton = ({ orderByHit, toggleOrderByHit }: Props) => {
	return (
		<Wrapper>
			<Button
				auto
				//  size='xs'
				onClick={toggleOrderByHit}
				color='secondary'
			>
				조회순 {orderByHit === 'desc' ? '⬆' : '⬇'}
			</Button>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	z-index: 1;
	button {
		height: 100%;
	}
`;

export default PostOrderButton;

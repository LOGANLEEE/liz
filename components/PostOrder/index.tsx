import { Button, Grid } from '@nextui-org/react';
import { OrderBy } from 'lib/crawl/logic/post';
import styled from 'styled-components';

type Props = { orderByHit: OrderBy; toggleOrderByHit: () => void };
export const PostOrder = ({ orderByHit, toggleOrderByHit }: Props) => {
	return (
		<Wrapper>
			<Button onClick={toggleOrderByHit}>조회순 {orderByHit === 'desc' ? '⬆' : '⬇'}</Button>
		</Wrapper>
	);
};

const Wrapper = styled.div``;

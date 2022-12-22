import { Button } from '@nextui-org/react';
import styled from 'styled-components';

type Props = { onClickHandler: () => void };
const SiteSelectorButton = ({ onClickHandler }: Props) => {
	return (
		<Wrapper>
			<Button
				onClick={onClickHandler}
				auto
				// size='xs'
				// onClick={toggleOrderByHit}
				color='secondary'
			>
				골라보기
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

export default SiteSelectorButton;

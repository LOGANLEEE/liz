import { Button, Modal, Row, Text } from '@nextui-org/react';
import { ReactNode, useCallback } from 'react';
import styled from 'styled-components';

type Props = {
	visible?: boolean;
	onCloseHandler: () => void;
	children: ReactNode;
	onReset?: () => void;
};

const SiteSelectModal = ({ visible, children, onCloseHandler, onReset }: Props) => {
	return (
		<Wrapper>
			<Modal closeButton blur aria-labelledby='modal-title' open={visible} onClose={onCloseHandler}>
				<Modal.Header>
					<Text id='modal-title' size={18}>
						원하는 사이트를 선택하세요
					</Text>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				<Modal.Footer>
					{onReset && (
						<Button onClick={onReset} auto color='error'>
							초기화
						</Button>
					)}
					{/* <Button onClick={onCloseHandler} auto color='error'>
						취소
					</Button> */}
					<Button onClick={onCloseHandler} auto color={'secondary'}>
						닫기
					</Button>
				</Modal.Footer>
			</Modal>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 100%;
`;

export default SiteSelectModal;

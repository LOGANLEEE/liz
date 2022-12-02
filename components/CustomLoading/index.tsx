import { Loading } from '@nextui-org/react';
import { memo } from 'react';
import styled from 'styled-components';

export const CustomLoading = memo(() => {
	return <StyledLoading type='spinner' size='md' />;
});

CustomLoading.displayName = 'CustomLoading';

const StyledLoading = styled(Loading)`
	position: fixed;
	top: 0;
	right: 0;
`;

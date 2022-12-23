import { Loading } from '@nextui-org/react';
import { memo } from 'react';
import styled from 'styled-components';

const CustomLoading = memo(() => {
	return <StyledLoading type='spinner' size='lg' />;
});

CustomLoading.displayName = 'CustomLoading';

const StyledLoading = styled(Loading)`
	position: fixed;
	top: 0;
	/* bottom: 0; */
	right: 0;
`;

export default CustomLoading;

import { Grid, Text } from '@nextui-org/react';
import { names } from 'lib/crawl/targetInfo';
import { useCallback } from 'react';
import styled from 'styled-components';

type Props = {
	targetSiteHandler: (val: string) => void;
	selectedSites: string[];
	useTitle?: boolean;
};

const TargetSiteSelector = ({ selectedSites, targetSiteHandler, useTitle = false }: Props) => {
	const onClickHandler = useCallback(
		(val: string) => {
			targetSiteHandler(val);
		},
		[targetSiteHandler]
	);

	return (
		<Wrapper justify='flex-start' direction='column' gap={0.5}>
			{useTitle && (
				<Grid>
					<Text className='text'>보고자하는 사이트를</Text>
					<Text className='text'>골라보세요.</Text>
				</Grid>
			)}
			<Grid>
				<StyledUl>
					{Object.values(names).map((name) => (
						<li
							className={`item ${selectedSites.find((site) => site === name) ? 'selected' : ''}`}
							key={name}
							onClick={() => onClickHandler(name)}
						>
							{name}
						</li>
					))}
				</StyledUl>
			</Grid>
		</Wrapper>
	);
};

const Wrapper = styled(Grid.Container)`
	.text {
		/* text-align: center; */
	}
`;

const StyledUl = styled.ul`
	width: 100%;
	.selected {
		background-color: #9b5b5b;
	}
	.item {
		cursor: pointer;
		padding: 5px 5px 5px 5px;
		margin: 5px 5px 5px 5px;
		display: inline-block;
		border: 1px solid silver;
		border-radius: 15px;

		&:hover {
			background-color: #633939;
		}
		&.active {
			background-color: #7e4949;
		}
	}
`;

export default TargetSiteSelector;

import { FormElement, Grid, Input } from '@nextui-org/react';
import CustomLineChart from 'components/CustomLineChart';
import { _axios } from 'lib/axiosInstance';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

type Props = {
	searchText: any;
	clearSearchText: () => void;
	searchTextHandler: (e: ChangeEvent<FormElement>) => void;
};

const DesktopContainer = ({ clearSearchText, searchText, searchTextHandler }: Props) => {
	const { data, error, isValidating } = useSWR(
		`/api/crawl/getAnalyzeSearch/${searchText}`,
		async () => await _axios.post('/api/crawl/getAnalyzeSearch', { searchText })
	);
	return (
		<Wrapper justify='center' direction='row' gap={1}>
			<Grid xs={12} sm={12} md={12} lg={12} xl={12} direction='column' justify='center'>
				<Input
					clearable
					underlined
					placeholder='Search...'
					width='100%'
					onClearClick={clearSearchText}
					onChange={searchTextHandler}
					initialValue={searchText}
				/>
			</Grid>
			<Grid xs={6} sm={6} md={12} lg={12} xl={12} direction='column' justify='center'>
				<CustomLineChart
					chartData={data?.data}
					width={400}
					height={300}
					dataKeys={['avg']}
					XdataKey='name'
					syncId='aa'
					introText='평균 조회수'
				/>
			</Grid>
			<Grid xs={6} sm={6} md={12} lg={12} xl={12} direction='column' justify='center'>
				<CustomLineChart
					chartData={data?.data}
					width={400}
					height={300}
					dataKeys={['sum']}
					XdataKey='name'
					syncId='aa'
					introText='조회수 총합'
				/>
			</Grid>
			<Grid xs={6} sm={6} md={12} lg={12} xl={12} direction='column' justify='center'>
				<CustomLineChart
					chartData={data?.data}
					width={400}
					height={300}
					dataKeys={['min']}
					XdataKey='name'
					syncId='aa'
					introText='최저 조회수'
				/>
			</Grid>
			<Grid xs={6} sm={6} md={12} lg={12} xl={12} direction='column' justify='center'>
				<CustomLineChart
					chartData={data?.data}
					width={400}
					height={300}
					dataKeys={['max']}
					XdataKey='name'
					syncId='aa'
					introText='최대 조회수'
				/>
			</Grid>
			<Grid xs={6} sm={6} md={12} lg={12} xl={12} direction='column' justify='center'>
				<CustomLineChart
					chartData={data?.data}
					width={400}
					height={300}
					dataKeys={['count']}
					XdataKey='name'
					syncId='aa'
					introText='총 게시물 갯수'
				/>
			</Grid>
		</Wrapper>
	);
};
const Wrapper = styled(Grid.Container)``;
export default DesktopContainer;

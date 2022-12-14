import { Grid } from '@nextui-org/react';
import CustomLineChart from 'components/CustomLineChart';
import styled from 'styled-components';
import { ChartData } from 'types';

type Props = {
	chartData: ChartData[];
};

const DesktopContainer = ({ chartData }: Props) => {
	return (
		<Wrapper justify='center' direction='row' gap={1}>
			<Grid xs={6} sm={6} md={12} lg={12} xl={12} direction='column' justify='center'>
				<CustomLineChart
					chartData={chartData}
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
					chartData={chartData}
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
					chartData={chartData}
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
					chartData={chartData}
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
					chartData={chartData}
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

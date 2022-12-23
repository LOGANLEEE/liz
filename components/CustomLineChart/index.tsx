import { Text } from '@nextui-org/react';
import { Area, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { ChartComponentProps } from 'types';

const CustomLineChart = ({ chartData, syncId, XdataKey, YdataKey, dataKeys, height, width, introText }: ChartComponentProps) => {
	return (
		<>
			{introText && <Text css={{ textAlign: 'center' }}>{introText}</Text>}
			<Wrapper width='100%' height={height}>
				<ComposedChart
					width={width}
					height={height}
					data={chartData}
					syncId={syncId}
					margin={{
						top: 10,
						right: 0,
						left: 0,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey={XdataKey} />
					<YAxis dataKey={YdataKey} />
					<Tooltip useTranslate3d contentStyle={{ color: 'black' }} />
					<Legend />

					{dataKeys?.map((dataKey, idx) => (
						<Area
							key={`area::${idx}::${dataKey}`}
							layout='vertical'
							type='monotone'
							dataKey={dataKey}
							stroke='#d4bb7f'
							fill='#96533b'
						/>
					))}
				</ComposedChart>
			</Wrapper>
		</>
	);
};

const Wrapper = styled(ResponsiveContainer)``;

export default CustomLineChart;

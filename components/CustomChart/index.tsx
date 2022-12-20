import { Text } from '@nextui-org/react';
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { ChartComponentProps } from 'types';

const CustomChart = ({ chartData, syncId, XdataKey, YdataKey, dataKeys, height, width, introText }: ChartComponentProps) => {
	// const CustomTooltip = ({ active, payload, label }) => {
	// 	if (active && payload && payload.length) {
	// 		return (
	// 			<div className='custom-tooltip'>
	// 				<p className='label'>{`${label} : ${payload[0].value}`}</p>
	// 				{/* <p className='intro'>{getIntroOfPage(label)}</p> */}
	// 				<p className='desc'>Anything you want can be displayed here.</p>
	// 			</div>
	// 		);
	// 	}

	// 	return null;
	// };
	return (
		<>
			{introText && <Text css={{ textAlign: 'center' }}>{introText}</Text>}
			<Wrapper width='100%' height={height}>
				{/* <LineChart */}
				{/* <AreaChart */}
				{/* <BarChart */}
				<ComposedChart
					width={width}
					height={height}
					data={chartData}
					syncId={syncId}
					margin={{
						top: 10,
						right: 10,
						left: 10,
						bottom: 0,
					}}
				>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey={XdataKey} />
					<YAxis />
					{/* <Tooltip content={CustomTooltip} /> */}
					<Tooltip useTranslate3d />
					{/* <Legend /> */}

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
					{dataKeys?.map((dataKey, idx) => (
						<Line
							key={`line::${idx}::${dataKey}`}
							layout='vertical'
							type='monotone'
							dataKey={dataKey}
							stroke='#d4bb7f'
							fill='#e5460c'
						/>
					))}
				</ComposedChart>
			</Wrapper>
		</>
	);
};

const Wrapper = styled(ResponsiveContainer)``;

export default CustomChart;

// const checkContrast = (color1, color2) => {
// 	const [r1, g1, b1] = getRGB(color1);
// 	const [r2, g2, b2] = getRGB(color2);

// 	const L1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
// 	const L2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;

// 	const contrastRatio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);

// 	return contrastRatio;
// };

// const getRGB = (color) => {
// 	if (color.startsWith('#')) {
// 		return [parseInt(color.slice(1, 3), 16), parseInt(color.slice(3, 5), 16), parseInt(color.slice(5, 7), 16)];
// 	} else {
// 		const [r, g, b] = color.match(/\d+/g);
// 		return [r, g, b];
// 	}
// };
// const getRandomVividHexColor = () => {
// 	let color;
// 	do {
// 		color = '#';
// 		for (let i = 0; i < 3; i++) {
// 			const channel = Math.floor(Math.random() * 256).toString(16);
// 			color += channel.length === 1 ? '0' + channel : channel;
// 		}
// 	} while (checkContrast(color, '#ffffff') < 4.5);
// 	return color;
// };

import type { fresh_post } from '@prisma/client';

export declare type VisitedList = {
	title?: string;
	id: number;
	name: string;
}[];

export declare type ChartData = {
	avg: number;
	count: number;
	max: number;
	min: number;
	sum: number;
	name: string;
};

export declare type ChartComponentProps = {
	introText?: string;
	height?: number;
	width?: number;
	syncId?: string;
	XdataKey?: string;
	YdataKey?: string;
	dataKeys?: string[];
	chartData: ChartData[];
};

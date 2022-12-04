export const delay = async (millisecond: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('');
		}, millisecond);
	});
};

export const masking = '---::--!@£!@£';

const numberFormatter = new Intl.NumberFormat();

export const numberFormat = (num: number) => numberFormatter.format(num);

export const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

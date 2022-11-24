import axios from 'axios';

export const _axios = axios.create({
	validateStatus: function (status) {
		return status < 400; // Resolve only if the status code is less than 500
	},
});

// _axios.interceptors.response.use(
// 	(config) => {
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

export const delay = async (millisecond: number) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('');
		}, millisecond);
	});
};

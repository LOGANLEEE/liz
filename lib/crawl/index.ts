import { _axios } from '../axiosInstance';

export const accessToWebsite = async () => {
	const { data } = await _axios.get('https://gall.dcinside.com/board/lists/?id=dcbest&list_num=100&sort_type=N&search_head=9&page=1');
	return { data };
};

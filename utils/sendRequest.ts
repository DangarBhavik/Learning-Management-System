import axios from 'axios';

export const sendRequest = async (
  url: string,
  method = 'get' as 'get' | 'post' | 'put' | 'patch' | 'delete',
  data?: any
) => {
  try {
    const response =
      method === 'delete' && data !== undefined
        ? await axios.delete(url, { data })
        : await axios[method](url, data);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const serverMessage = error.response.data.message || error.response.data.error;
      throw new Error(serverMessage || 'Request failed');
    }

    throw error;
  }
};

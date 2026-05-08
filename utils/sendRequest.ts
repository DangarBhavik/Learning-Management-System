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

    if (!response.data.success) {
      throw new Error(response.data.message || 'Request failed');
    }

    return response.data;
  } catch (error) {
    console.error('Error sending request:', error);
    throw error;
  }
};

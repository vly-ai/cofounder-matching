import axiosInstance from './axiosInstance';

const fetchNotifications = async () => {
    try {
        const response = await axiosInstance.get('/api/notifications');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching notifications');
    }
};

export default fetchNotifications;
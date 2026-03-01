import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

export const serviceService = {
  /**
   * Get all services
   */
  getAll: async (activeOnly = true) => {
    const response = await axiosInstance.get(ENDPOINTS.SERVICES, {
      params: { activeOnly },
    });
    return response.data;
  },

  /**
   * Get service by ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.SERVICE_BY_ID(id));
    return response.data;
  },

  /**
   * Get services by category
   */
  getByCategory: async (categoryId) => {
    const response = await axiosInstance.get(
      ENDPOINTS.SERVICES_BY_CATEGORY(categoryId)
    );
    return response.data;
  },
};

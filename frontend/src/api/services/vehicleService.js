import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

export const vehicleService = {
  /**
   * Get all vehicles (Admin only)
   */
  getAll: async () => {
    const response = await axiosInstance.get(ENDPOINTS.VEHICLES);
    return response.data;
  },

  /**
   * Get my vehicles (Customer)
   */
  getMyVehicles: async () => {
    const response = await axiosInstance.get(ENDPOINTS.MY_VEHICLES);
    return response.data;
  },

  /**
   * Get vehicle by ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.VEHICLE_BY_ID(id));
    return response.data;
  },

  /**
   * Create new vehicle
   */
  create: async (vehicleData) => {
    const response = await axiosInstance.post(ENDPOINTS.VEHICLES, vehicleData);
    return response.data;
  },

  /**
   * Update vehicle
   */
  update: async (id, vehicleData) => {
    const response = await axiosInstance.put(
      ENDPOINTS.VEHICLE_BY_ID(id),
      vehicleData
    );
    return response.data;
  },

  /**
   * Delete vehicle
   */
  delete: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.VEHICLE_BY_ID(id));
    return response.data;
  },
};

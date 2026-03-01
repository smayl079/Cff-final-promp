import axiosInstance from '../axios.config';
import { ENDPOINTS } from '../endpoints';

export const appointmentService = {
  /**
   * Get all appointments (Admin/Manager only)
   */
  getAll: async (pageNumber = 1, pageSize = 20) => {
    const response = await axiosInstance.get(ENDPOINTS.APPOINTMENTS, {
      params: { pageNumber, pageSize },
    });
    return response.data;
  },

  /**
   * Get appointment by ID
   */
  getById: async (id) => {
    const response = await axiosInstance.get(ENDPOINTS.APPOINTMENT_BY_ID(id));
    return response.data;
  },

  /**
   * Get my appointments (Customer)
   */
  getMyAppointments: async () => {
    const response = await axiosInstance.get(ENDPOINTS.MY_APPOINTMENTS);
    return response.data;
  },

  /**
   * Create new appointment
   */
  create: async (appointmentData) => {
    const response = await axiosInstance.post(ENDPOINTS.APPOINTMENTS, appointmentData);
    return response.data;
  },

  /**
   * Update appointment
   */
  update: async (id, appointmentData) => {
    const response = await axiosInstance.put(
      ENDPOINTS.APPOINTMENT_BY_ID(id),
      appointmentData
    );
    return response.data;
  },

  /**
   * Update appointment status
   */
  updateStatus: async (id, status) => {
    const response = await axiosInstance.patch(ENDPOINTS.APPOINTMENT_STATUS(id), {
      status,
    });
    return response.data;
  },

  /**
   * Cancel appointment
   */
  cancel: async (id) => {
    const response = await axiosInstance.delete(ENDPOINTS.APPOINTMENT_BY_ID(id));
    return response.data;
  },
};

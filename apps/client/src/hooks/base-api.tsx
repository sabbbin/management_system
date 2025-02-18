import axios, { AxiosInstance } from "axios";
import { useLoginSessionStore } from "../store/login-session-store";

const getApiInstance = () => {
  let axiosInstance: AxiosInstance | null = null;
  const bearerToken = useLoginSessionStore.getState().loginData?.token ?? "";
  console.log("bearToken", bearerToken);
  return (): AxiosInstance => {
    if (!axiosInstance) {
      axiosInstance = axios.create({
        baseURL: "/api/v1",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
    }
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const newToken =
              useLoginSessionStore.getState().loginData?.token ?? "";

            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            if (axiosInstance) {
              return axiosInstance(originalRequest);
            }

            return Promise.reject(error);
          } catch (err) {
            return Promise.reject(err);
          }
        }
      },
    );
    return axiosInstance;
  };
};

export const axiosInstance = getApiInstance();

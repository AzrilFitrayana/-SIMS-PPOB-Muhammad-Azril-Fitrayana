import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com/",
  timeout: 3000,
});

const apiInstanceWithToken = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com/",
  timeout: 3000,
});

apiInstanceWithToken.interceptors.request.use((config) => {
  const session = localStorage.getItem("token");

  if (!session) {
    return config;
  }

  config.headers.Authorization = `Bearer ${session}`;
  return config;
});

apiInstanceWithToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { apiInstance, apiInstanceWithToken };

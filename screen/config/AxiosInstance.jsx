import axios from "axios";
import DataUserAuth from "../state/AuthUser";

// Supongamos que tokenValidation es un estado que contiene el token
const { TokenAuth } = DataUserAuth;
// Crea la instancia de Axios con la URL base y el encabezado personalizado
const axiosInstance = axios.create({
  baseURL: "https://dev.intisoft.com.pe/api/v1/", // Reemplaza con tu URL base
});
axiosInstance.interceptors.request.use((config) => {
  const token = TokenAuth; // Obtener el token almacenado en el localStorage
  if (token) {
    config.headers["Validation"] = token; // Agregar el token al encabezado de la solicitud
  }
  return config;
});

export default axiosInstance;

import axios from "axios";

const axiosFetch = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
});

export default axiosFetch;

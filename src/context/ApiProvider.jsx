import { createContext, useContext } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  const BASE_URL = import.meta.env.VITE_API_URL;
  console.log(`BASE URL : ${BASE_URL}`)

  const api = axios.create({
    baseURL : BASE_URL,
  })

  // * Request interceptor to handle FormData automatically
  api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      // Let Axios set Content-Type automatically
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  });


  return (
    <ApiContext.Provider value={{ api }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);

ApiProvider.propTypes = {
  children: PropTypes.node
};
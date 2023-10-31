import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const initialState = {
  productos: [],
  getProductosById: () => {},
};

export const GlobalContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "setProductos":
      return { ...state, productos: action.payload };
    default:
      throw new Error(`Acción no reconocida: ${action.type}`);
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los datos", error);
      return [];
    }
  };

  const getProductos = async () => {
    const productosData = await fetchData(
      "http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos"
    );
    dispatch({ type: "setProductos", payload: productosData });
  };

  const getProductosById = async (id) => {
    const productoData = await fetchData(
      `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos/${id}`
    );
    return productoData;
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, getProductosById }}>
      {children}
    </GlobalContext.Provider>
  );
};
import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";


const initialState = {
  productos: [],
  productosAleatorios: [],
  userRol: localStorage.getItem("role") || null, // rol del usuario
  token: localStorage.getItem("token") || null, // Token de autenticación
  getProductosById: () => {},
};

export const GlobalContext = createContext(initialState);


const reducer = (state, action) => {
  switch (action.type) {
    case "setProductos":
      return { ...state, productos: action.payload };
      case "setProductosAleatorios":
        return { ...state, productosAleatorios: action.payload };  
        case "login":
          localStorage.setItem("role", action.payload.role);
          localStorage.setItem("token", action.payload.token);
          return {
            ...state,
            userRol: action.payload.role,
            token: action.payload.token,
          };
          case "logout":
            localStorage.removeItem("token");
            return {
              ...state,
              userRol: null,
              token: null,
            };
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
  
  const login = async (userData) => {
    try {
      const response = await axios.post(
        "http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/auth/login",
        userData
        );
      dispatch({ type: "login", payload: response.data });
      alert('Inicio de sesión exitoso')
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const getProductos = async () => {
    const productosData = await fetchData(
      "http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos"
    );
    dispatch({ type: "setProductos", payload: productosData });
  };

  const getProductosAleatorios = async () => {
    const productosData = await fetchData(
      "http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos/aleatorios?cantidad=10"
    );
    dispatch({ type: "setProductosAleatorios", payload: productosData });
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
    <GlobalContext.Provider value={{ ...state, getProductosById, getProductosAleatorios, getProductos, login }}>
      {children}
    </GlobalContext.Provider>
  );
};
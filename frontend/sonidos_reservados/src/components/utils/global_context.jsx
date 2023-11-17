import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const initialState = {
  productos: [],
  productosAleatorios: [],
  usuarios: [],
  categorias: [],
  email: localStorage.getItem('email') || null,
  lastname: localStorage.getItem('lastname') || null,
  firstname: localStorage.getItem('firstname') || null,
  username: localStorage.getItem('username') || null,
  userRol: localStorage.getItem("role") || null, 
  token: localStorage.getItem("token") || null,
  getProductosById: () => {},
};

export const GlobalContext = createContext(initialState);


const reducer = (state, action) => {
  switch (action.type) {
        case "setProductos":
          return { ...state, productos: action.payload };
        case "setProductosAleatorios":
          return { ...state, productosAleatorios: action.payload }; 
        case "setCategorias":
          return { ...state, categorias: action.payload };
        case "usuarios":
          return {...state, usuarios: action.payload}
        case "eliminarUsuario":
          const usuariosActualizados = state.usuarios.filter(
            (usuario) => usuario.id !== action.payload
          );
          return { ...state, usuarios: usuariosActualizados };
        case "updateUsuario":
          const usuariosModificados = state.usuarios.map((usuario) => {
            if (usuario.id === action.payload.id) {
              return action.payload.updatedUsuario;
            }
            return usuario;
          });
          return { ...state, usuarios: usuariosModificados };
        case "postProducto":
          return { ...state , productos: [...state.productos, action.payload] };
        case "eliminarProducto":
          const productosActualizados = state.productos.filter(
            (producto) => producto.id !== action.payload
          );
          return { ...state, productos: productosActualizados };
        case "login":
          localStorage.setItem("firstname", action.payload.firstname);
          localStorage.setItem("lastname", action.payload.lastname);
          localStorage.setItem("email", action.payload.email);
          localStorage.setItem("username", action.payload.username);
          localStorage.setItem("role", action.payload.role);
          localStorage.setItem("token", action.payload.token);
          return {
            ...state,
            firstname: action.payload.firstname,
            lastname: action.payload.lastname,
            email: action.payload.email,
            username: action.payload.username,
            userRol: action.payload.role,
            token: action.payload.token,
          };
          case "logout":
            localStorage.removeItem("firstname");
            localStorage.removeItem("lastname");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            return {
              ...state,
              firstname: null,
              lastname: null,
              email: null,
              username: null,
              userRol: null,
              token: null,
            };
            default:
              throw new Error(`Acción no reconocida: ${action.type}`);
            }
          };
          
         
export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
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
      if (response.status === 200) {
        Swal.fire({
          title: '¡Inicio de sesión exitoso!',
          icon: 'success',
        })
        navigate('/')
      }
    } catch (error) {
      Swal.fire({
        title: '¡Error al iniciar sesión!',
        text: error.response.data.message,
        icon: 'error',
      })
    }
  };

  const logout = () => {
    try {
      dispatch({ type: "logout"});
      Swal.fire({
        title: '¡Se ha cerrado su sesión!',
        icon: 'success',
      })
    } catch (error) {
      Swal.fire({
        title: '¡Error al cerrar sesión!',
        text: error.response.data.message,
        icon: 'error',
      });
    }
  };

  // USUARIOS -----------------------------------------------------------------------------------------------

  const getUsuarios = async () => {
    try {
      const response = await axios.get("http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/usuarios", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      dispatch({ type: 'usuarios', payload: response.data });
    } catch (error) {
      console.error("Error al obtener usuarios", error);
    }
  };

  const updateUsuario = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/usuarios/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: "updateUsuario", payload: { id, updatedUsuario: response.data } });
  
      Swal.fire({
        title: '¡Usuario actualizado exitosamente!',
        icon: 'success',
      });
    } catch (error) {
      console.error("Error al actualizar usuario", error);
      Swal.fire({
        title: '¡Error al actualizar usuario!',
        text: error.response?.data?.message || 'Ocurrió un error inesperado',
        icon: 'error',
      });
    }
  };

  const deleteUsuario = async (id) => {
    try {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción es irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar',
      });
  
      if (confirmacion.isConfirmed) {
        await axios.delete(
          `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/usuarios/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        dispatch({ type: "eliminarUsuario", payload: id });
  
        Swal.fire({
          title: '¡Usuario eliminado exitosamente!',
          icon: 'success',
        });
      } else {
        console.log('Eliminación cancelada');
      }
    } catch (error) {
      console.error("Error al eliminar usuario", error);
      Swal.fire({
        title: '¡Error al eliminar usuario!',
        text: error.response?.data?.message || 'Ocurrió un error inesperado',
        icon: 'error',
      });
    }
  };

  const getUsuarioById = async (id) => {
    const usuarioData = await fetchData(
      `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/usuarios/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return usuarioData;
  };

  // PRODUCTOS -----------------------------------------------------------------------------------------------

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

  const postProducto = async (formData) => {
    try {
      const response = await axios.post('http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos', formData, {
        headers: {
          'Authorization': `Bearer ${state.token}`,
        },
      });
        dispatch({ type: "postProducto", payload: response.data });
        Swal.fire({
          title: 'Producto creado exitosamente',
          text: '¡Tu producto fue agregado a la lista!',
          icon: 'success',
        });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      Swal.fire({
        title: '¡Error al crear producto!',
        text: 'Intenta nuevamente',
        icon: 'error',
      });
    }
  };
  

  const deleteProducto = async (id) => {
    try {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción es irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, eliminar',
      });
  
      if (confirmacion.isConfirmed) {
        await axios.delete(
          `http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        dispatch({ type: "eliminarProducto", payload: id });
  
        Swal.fire({
          title: 'Producto eliminado exitosamente!',
          icon: 'success',
        });
      } else {
        console.log('Eliminación cancelada');
      }
    } catch (error) {
      console.error("Error al eliminar producto", error);
      Swal.fire({
        title: '¡Error al eliminar producto!',
        text: error.response?.data?.message || 'Ocurrió un error inesperado',
        icon: 'error',
      });
    }
  };

  // CATEGORIAS -----------------------------------------------------------------------------------------------

  const getCategorias = async () => {
    const categoriasData = await fetchData(
      "http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/categorias"
    );
    dispatch({ type: "setCategorias", payload: categoriasData });
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, getProductosById, getProductosAleatorios, getProductos, deleteProducto, login, logout, getUsuarios, deleteUsuario, updateUsuario, getUsuarioById, postProducto, getCategorias }}>
      {children}
    </GlobalContext.Provider>
  );
};
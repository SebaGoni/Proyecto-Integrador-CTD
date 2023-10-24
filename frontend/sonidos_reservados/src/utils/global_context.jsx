import React, { createContext, useEffect, useReducer } from "react";

const globalReducer = (state,action) =>{
    switch(action.type){ 
        case "LOAD_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                isLoading: false
            };
        default:
            return state;
        }
    }

export const GlobalContext = createContext();


const GlobalProvider = ({ children }) => {
    const initialState = { 
      products: [],       
    };
const endpoint = 'https://jsonplaceholder.typicode.com/users';

useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "LOAD_PRODUCTS", payload: data });        
      })
      .catch((error) => {
        console.error("Error al obtener la lista: ", error);
      });
  }, [state.products]); 

const [state,dispatch]= useReducer(globalReducer,initialState);

return (
    <GlobalContext.Provider value={{ state,dispatch }}>
      {children}
    </GlobalContext.Provider>
  );

}
export default GlobalProvider;

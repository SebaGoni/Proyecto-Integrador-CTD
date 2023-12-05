import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Categorias() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/categorias');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);


  
/*Para routearlo en Link al endpoint pero aun no sirve to={`/categorias/${category.id}`}*/
  
return (
      <DivCategorias>
          <h2>CATEGORIAS</h2>
          <ButtonsContainer>
            {categories.map((category) => (
              <Link key={category.id} to={`/products`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                <button
                  onClick={() => setSelectedCategory(category.nombre)}
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                  }}
                >
                  <div className="button-content">{category.nombre}</div>
                </button>
            </Link>
            ))}
          </ButtonsContainer>
      </DivCategorias>
  );
}

export default Categorias;

const DivCategorias = styled.div`
  
  margin: 2rem;
  padding: 2.5rem;
  background-color:rgba(255, 255, 255, 0.8);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  h2 {
    font-family: 'Poppins', sans-serif;
    color: black;
    margin: 1rem;
    padding: 1rem;
    letter-spacing: 4px;
    font-weight: 500;
    border-bottom: solid;
    @media(min-width: 1000px){
          font-size:2rem;
        }
        @media(max-width: 1000px){
          font-size:1.8rem;
          text-align: center;
        }
  }
`;

const ButtonsContainer = styled.div`
  display: grid;
  gap: 1.2rem;
  width: 100%;
  @media (min-width: 901px) and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1201px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
  button {
    width: 400px;
    height: 200px;
    padding: 1rem;
    background-color: black;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.3rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    letter-spacing: 3px;
    cursor: pointer;
    }
  .button-content{
    background-color: rgb( 0,0,0,0.6);
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius:15px;
  }
`
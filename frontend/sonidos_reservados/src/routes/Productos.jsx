import React, {useContext, useState, useEffect} from 'react'
import { GlobalContext } from '../components/utils/global_context';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const Productos = () => {

    const { getProductos, productos } = useContext(GlobalContext);
    const [loaded, setLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
      if (!loaded) {
        // Llama a la función getProductosAleatorios solo una vez al cargar el componente
        getProductos();
        setLoaded(true);
      }
    }, [getProductos, productos]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (
        <ProductosStyle>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={productos.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <div className='productos'>
            <div className='container-items'>
              {currentItems.map(product => (
                <Link className='link' to={`/details/${product.id}`} key={product.id}>
                  <div className='item'>
                    <figure>
                      <img src={product.image} alt={product.title} className='cardImage'/>
                    </figure>
                    <div className='info-product'>
                      <h3>{product.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ProductosStyle>
      );
    };
    
    export default Productos;
    
    
    
    const ProductosStyle = styled.div`
        margin: 2rem;
        display: block;
        .productos{
          border-radius:  20px;
          background-color: white;
          padding: 1rem;
        }
        h2{
            margin: 2rem;
            padding: 1rem;
            color: black;
            border-bottom: solid;
            font-family: 'Concert One', sans-serif;
            font-size: 2rem;
        }
        .link{
          text-decoration: none;
        }
        .container-items{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .item{
            border-radius: 20px;
            justify-content: center;
            align-items: center;
            border-bottom: solid gray;
            flex: 0 0 calc(50% - 50px);
            margin: 5px;
            cursor: pointer;
            width: 600px;
            height: 600px;
        }
        h3{
            margin: 2rem;
            padding: 1rem;
            color:black;
            font-size:1.5rem;
            font-family: 'Concert One', sans-serif;
        }
    
        .cardImage{
          height: 400px;
          width: 400px;
          object-fit: cover;
        }
    
        
    `
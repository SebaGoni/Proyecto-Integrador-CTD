import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from '../components/utils/global_context';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styled from 'styled-components';

const Details = () => {

  const { getProductosById } = useContext(GlobalContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      getProductosById(id)
        .then((productData) => {
          setProduct(productData);
        })
        .catch((error) => {
          console.error("Error al obtener el detalle del producto", error);
        });
    }
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
      <DetailContainer>
        <div className='divTitle'>
          <h2 className='title'>{product.title}</h2>
          <Link to='/'>
            <AiOutlineArrowLeft className='iconArrow'/>
          </Link>
        </div>
        <div className='divBody'>
          <div className='divBodyImages'>
            <div>
             <img className='img1' src={product.image} alt="" />
            </div>
            <div className='divImages'>
              {product?.imagenes && (
                <>
                  <div className='divSectionImages1'>
                    <img className='img2' src={product.imagenes[0]} alt="" />
                    <img className='img2' src={product.imagenes[1]} alt="" />
                  </div>
                  <div className='divSectionImages2'>
                    <img className='img2' src={product.imagenes[2]} alt="" />
                    <img className='img2' src={product.imagenes[3]} alt="" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='divBodyText'>
          <h2>Conoce un poco de este instrumento de <span>{product.categoria}</span></h2>
          <p className='description'>{product.description}</p>
          <h2 className='price'>${product.price}.00</h2>
        </div>
      </DetailContainer>
  )
}

export default Details

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
    margin-left: 2rem;
    margin-right: 2rem;
    gap: 2rem;

    .divTitle{
      background-color: #D9D9D9;
      border-radius: 60px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title{
      margin-left: 2rem;
      color: black;
    }

    .iconArrow{
      margin-right: 2rem;
      font-size: 2rem;
      color: black;
      cursor: pointer;
    }

    .divBody{
      background-color: #D9D9D9;
      border-radius: 60px;
      width: 100%;
      display: flex;
    }

    .divBodyImages{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding: 2rem 0 2rem 0;
      height: 100%;
      width: 100%;
    }

    .img1{
      width: 500px;
      height: 500px;
      object-fit: cover;
    }

    .divImages{
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .img2{
      object-fit: cover;
      width: 245px;
      height: 245px;
      margin-right: 5px;
      margin-left: 5px;
    }

    .divBodyText{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0rem 2rem 0rem 2rem;
    }

    .description{
      color: #ffffff9a;
    }

    .price{
      color: #ffffff;
    }
`

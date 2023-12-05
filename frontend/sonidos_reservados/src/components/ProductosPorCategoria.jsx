import React, { useState, useEffect } from 'react';
import CardsPorCategoria from '../components/CardsPorCategoria';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ProductosPorCategoria() {
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const { nombre } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/productos/categoria/${encodeURIComponent(nombre)}`);
        if (response.ok) {
          const data = await response.json();
          setProductosPorCategoria(data);
        } else {
          console.error('Failed to fetch products for this category');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsByCategory();
  }, [nombre]);

  return (
    <div>
      <CardsPorCategoria productosPorCategoria={productosPorCategoria} nombre={nombre}/>
    </div>
  );
}

export default ProductosPorCategoria;
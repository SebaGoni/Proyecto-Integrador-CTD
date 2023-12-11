import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GlobalContext } from './utils/global_context';
import { useState, useContext, useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ListaCaracteristicas = () => {

    const { caracteristicas, getCaracteristicas, updateCaracteristica, deleteCaracteristica } = useContext(GlobalContext);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [editedCaracteristica, setEditedCaracteristica] = useState({
        nombre: '',
        image: '', 
    });

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
        if (!loaded) {
            getCaracteristicas();
            setLoaded(true);
        }
      }, [getCaracteristicas, caracteristicas]);


        const openModal = (caracteristica) => {
            setEditedCaracteristica({
            id: caracteristica.id,
            nombre: caracteristica.nombre,
            image: caracteristica.image,
            });
            setModalIsOpen(true);
        };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

      const handleEditCaracteristica = () => {
        const formData = new FormData();
        formData.append('nombre', editedCaracteristica.nombre);
        formData.append('imagen', editedCaracteristica.image);
        updateCaracteristica(editedCaracteristica.id, formData);
        setModalIsOpen(false);
      };

      const handleChange = (e) => {
        const { name, files } = e.target;
    
        if (name === 'image' && files.length > 0) {
          setEditedCaracteristica((prevCaracteristica) => ({
            ...prevCaracteristica,
            [name]: files[0],
          }));
        } else {
          const value = e.target.value;
          setEditedCaracteristica((prevCaracteristica) => ({
            ...prevCaracteristica,
            [name]: value,
          }));
        }
      };

  return (
    <CaracteristicasContainer>
      <Link to='/admin'>
        <AiOutlineArrowLeft className='iconArrow'/>
      </Link>
      <h2>CARACTERÍSTICAS</h2>
      <table className='TablaDeProductos'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Imagen</th>
          </tr>
        </thead>
        <tbody>
            {caracteristicas.map((caracteristica) => (
                    <tr key={caracteristica.id} className='thUsuarios'>
                        <th>{caracteristica.id}</th>
                        <td>{caracteristica.nombre}</td>
                        <td>
                            <img className='tdImage' src={caracteristica.image} alt='Caracteristica' />
                        </td>
                        <td>
                            <button
                            className='BotonEditar'
                            onClick={() => openModal(caracteristica)}
                            role='button'
                            >
                            Editar
                            </button>
                        </td>
                        <td>
                            <button
                                type="button"
                                className='BotonEliminar'
                                onClick={()=>{deleteCaracteristica(caracteristica.id)}}>
                                Eliminar
                            </button>
                        </td>
                        <Modal
                            style={{
                            content: {
                                top: '60%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                borderRadius: '20px',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                color: 'black',
                                width: '500px',
                                height: '300px',
                                textAlign: 'center',
                            },
                            }}
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{ marginBottom: '30px' }}>Editar Característica</h2>
                                <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px' }}>
                                        <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ fontWeight: 600 }} htmlFor='nombre'>Nombre</label>
                                            <input
                                            style={{
                                                borderRadius: '10px',
                                                border: 'solid 0.5px #7A7A7A',
                                                height: '25px',
                                                width: '200px',
                                                padding: '5px',
                                            }}
                                            type='text'
                                            id='nombre'
                                            name='nombre'
                                            value={editedCaracteristica.nombre}
                                            onChange={handleChange}
                                            />
                                        </div>
                                        <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                            <label style={{ fontWeight: 600 }} htmlFor='image'>Imagen de Característica</label>
                                            <input
                                            style={{
                                                borderRadius: '10px',
                                                border: 'solid 0.5px #7A7A7A',
                                                height: '25px',
                                                width: '200px',
                                                padding: '5px',
                                            }}
                                            type='file'
                                            id='image'
                                            name='image'
                                            onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                        <button style={{ width: '150px', padding: '10px', backgroundColor: '#d33', border: 'none', color: 'white', fontWeight: 600, borderRadius: '5px', cursor: 'pointer',  transition: 'background-color 0.3s' }} 
                                        onMouseOver={(e) => (e.target.style.backgroundColor = '#bc1d1d')}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = '#d33')}
                                        onClick={closeModal}>
                                            Cancelar
                                        </button>
                                        <button type="submit" style={{ width: '150px', padding: '10px', backgroundColor: '#3085d6', border: 'none', color: 'white', fontWeight: 600, borderRadius: '5px', cursor: 'pointer',  transition: 'background-color 0.3s' }} 
                                        onMouseOver={(e) => (e.target.style.backgroundColor = '#216ab0')}
                                        onMouseOut={(e) => (e.target.style.backgroundColor = '#3085d6')}
                                        onClick={handleEditCaracteristica}>
                                            Guardar cambios
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Modal>
                    </tr>
                )
            )}
        </tbody>
      </table>
      <Link to='/admin/newCharacteristic'
              className='BotonAdmin'
              role="button"> Nueva característica
      </Link>
    </CaracteristicasContainer>
  )
}

export default ListaCaracteristicas

const CaracteristicasContainer = styled.div`   
  background-color: white;
  border-radius: 20px;
  color: black;
  margin: 15rem 2rem 1rem 2rem;
  padding: 2rem;
  .iconArrow{
      margin-right: 2rem;
      font-size: 2rem;
      color: black;
      cursor: pointer;
    }
  h2{
    font-size: 40px;
    text-align: center;
  }
  table, th, tr {
    text-align: center;
    border-bottom: solid .1px #e7e7e7;
    padding: 2rem;
    margin: auto;
  }
  .tdImage{
    width: 100px;
    height: 50px;
    object-fit: cover;
    padding: 0 2rem 0 2rem;
  }
  .BotonAdmin{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    border: solid .1px gray;
    border-radius: 10px;
    padding: 1rem;
    background-color: black;
    color: white;
  }

.BotonEditar{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #32CD32;
  padding: .5rem;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  margin-left: 1rem;
}
.BotonEliminar{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF5733;
  padding: .5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  margin-left: 1rem;
  color: white;
  cursor: pointer;
}
`
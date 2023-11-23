import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { GlobalContext } from './utils/global_context';
import { useEffect, useContext } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

Modal.setAppElement('#root');

const ListaUsuarios = () => {
  const { usuarios, getUsuarios, deleteUsuario, updateUsuario } = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedUserId, setEditedUserId] = useState(null); // Nuevo estado para almacenar el ID del usuario editado
  const [editedUser, setEditedUser] = useState({
    firstname: '',
    lastname: '',
    role: '',
  });

  console.log(typeof editedUser);
  console.log(editedUserId);

  useEffect(() => {
    if (!loaded) {
      getUsuarios();
      setLoaded(true);
    }
  }, [getUsuarios, usuarios]);

  const handleEditarUsuario = (usuario) => {
    setEditedUserId(usuario.id); // Almacena el ID del usuario seleccionado
    setEditedUser({
      firstname: usuario.firstname,
      lastname: usuario.lastname,
      role: usuario.role,
    });
    setModalIsOpen(true);
  };

  const handleUpdateUsuario =  () => {
    try {
      updateUsuario(editedUserId, editedUser);
      closeModal();
    } catch (error) {
      alert("Error al actualizar usuario", error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <UserContainer>
      <Link to='/admin'>
        <AiOutlineArrowLeft className='iconArrow' />
      </Link>
      <h2>Usuarios</h2>
      <table className='TablaDeProductos'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Apellido</th>
            <th scope='col'>Email</th>
            <th scope='col'>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className='thUsuarios'>
              <th>{usuario.id}</th>
              <td>{usuario.firstname}</td>
              <td>{usuario.lastname}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td>
                <button
                  className='BotonEditar'
                  onClick={() => handleEditarUsuario(usuario)}
                  role='button'
                >
                  Editar
                </button>
              </td>
              <td>
                <button
                  type='button'
                  className='BotonEliminar'
                  onClick={() => {
                    deleteUsuario(usuario.id);
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            borderRadius: '20px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            width: '500px',
            height: '300px',
            textAlign: 'center'
          },
        }}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '30px' }}>Editar Usuario</h2>
          <form onSubmit={handleUpdateUsuario}>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
              <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>Nombre</label>
                <input
                 style={{
                  borderRadius: '10px',
                  border: 'solid 0.5px #7A7A7A',
                  height: '25px',
                  width: '200px',
                  padding: '5px',
                  }}
                  type="text"
                  value={editedUser.firstname}
                  onChange={(e) => setEditedUser({ ...editedUser, firstname: e.target.value })}
                />
              </div>
              <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontWeight: 600 }}>Apellido</label>
                <input
                  style={{
                  borderRadius: '10px',
                  border: 'solid 0.5px #7A7A7A',
                  height: '25px',
                  width: '200px',
                  padding: '5px',
                  }}
                  type="text"
                  value={editedUser.lastname}
                  onChange={(e) => setEditedUser({ ...editedUser, lastname: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '20px', gap: '5px'}}>
              <label style={{ fontWeight: 600 }}>Rol</label>
              <select
                style={{
                  borderRadius: '10px',
                  border: 'solid 0.5px #7A7A7A',
                  height: '35px',
                  width: '200px',
                  padding: '5px',
                  }}
                value={editedUser.role}
                onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
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
              onMouseOut={(e) => (e.target.style.backgroundColor = '#3085d6')}>
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </UserContainer>
  );
};

export default ListaUsuarios;

const UserContainer = styled.div`   
  background-color: white;
  border-radius: 20px;
  color: black;
  margin: 30vh 2rem 1rem 2rem;
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #32CD32;
  padding: .5rem;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
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

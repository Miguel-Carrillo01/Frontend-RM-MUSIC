import React, { useState, useContext, useEffect } from 'react'
// import styles from "../HomeUser/HomeUser.css"
import { FormGroup } from '../../../UI/FormGroup/FormGroup';
import { UserDataContext} from '../../Context/UserDataProvider'
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';



// Obtencion de los datos del ususario

export const ProfileArtist = () => {
  // Mantenemos Actualizando el userdata del usecontext, para mantener la pagina actulizada
  const {updateUserData} = useContext(UserDataContext);
  const navigate = useNavigate()
  const {userData} = useContext(UserDataContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setEditingPassword] = useState(false);
  const [name, setName] = useState(userData?.name);
  const [cellphone, setCellphone] = useState(userData?.phone);
  // Cambio de Contraseña
  const [currentPassword, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Mostrar Div del perfil
  const [showDiv, setShowDiv] = useState(false);

  
  // Eliminar Vehiculo 
  // const [hoveredVehicleIndex, setHoveredVehicleIndex] = useState(null);
  // const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  // const [hoveredVehicleIndex, setHoveredVehicleIndex] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const closeSesion = async () => {
    navigate(`/`);
    localStorage.clear();
    window.location.reload();
  }

// Validacion de que los campos se guardan
  useEffect(() => {
    if (!name && !cellphone) {
      setName(userData?.name);
      setCellphone(userData?.cellphone);
    }
  }, [userData, cellphone, name]);


  // Alertas de actualizacion de datos 
  const correctUpdateData = () =>{
    Swal.fire({
        icon: 'success',
        title: '¡Excelente!',
        html: 'Tus Datos Han Sido Actualizados',
        showConfirmButton: true,
        confirmButtonText: 'Hecho',
        customClass: {
          title: 'titleUpdatePass',
          content: 'textUpdatePass',
          confirmButton: 'btnUpdatePass',
        },
      })
    };

  const incorrectUpData = () =>{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Verifica Los Datos E Intentalo Mas Tarde',
          confirmButtonText: 'OK',
          customClass: {
            title: 'titleUpdateIncorrect',
            content: 'textUpdatePass',
            confirmButton: 'btnIncorrectPass',
          },
        })
  }

  // Alertas Cambio de contraseña
  const correctUpdatePass = () =>{
    Swal.fire({
        icon: 'success',
        title: '¡Excelente!',
        html: 'Contraseña Actualizada <br> Debes Volver A Iniciar Sesion',
        showConfirmButton: true,
        confirmButtonText: 'OK',
        customClass: {
          title: 'titleUpdatePass',
          content: 'textUpdatePass',
          confirmButton: 'btnUpdatePass',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/`);
        }
      });
    };

  const incorrectUpPassword = () =>{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Datos incorrectos',
          confirmButtonText: 'OK',
          customClass: {
            title: 'titleUpdateIncorrect',
            content: 'textUpdatePass',
            confirmButton: 'btnIncorrectPass',
          },
        })
  }


  // Modal Agregar Vehiculo
  const vehicleModal = () => {
    setShowModal(!showModal);
    console.log(userData);
  };
  
    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleEditPassword = ()=>{
      setEditingPassword(true)
    }
  
    const handleCancelClick = () => {
      setIsEditing(false);
      setEditingPassword(false);
    };


    useEffect(() => {
      if (!name && !cellphone) {
        setName(userData?.name);
        setCellphone(userData?.cellphone);
      }
    }, [userData, cellphone, name]);


    const updateData = async(e) => {
      e.preventDefault()
      const User = {
        name, cellphone
      };
      
      try {
        console.log(User);
        await axios.patch(`http://localhost:5000/api/users/updateUser/${userData?.mongoId}`, User);
        // await axios.patch(`https://backend-space-parking.onrender.com/api/users/updateUser/${userData?.idUser}`, User);
        getUser()
        setIsEditing(false);
        correctUpdateData();
       } catch (error) {
       incorrectUpData()
     }
     }

     // Peticion de obtener el usuario luego de actualizar los datos
 const getUser = async () => {
  try {
    if (userData?.email) {
      const response = await axios.post('http://localhost:5000/api/users/meUser', { email: userData?.email });
      // const response = await axios.post('https://backend-space-parking.onrender.com/api/users/meUser', { email: userData?.email });
      updateUserData(response.data);
    }
  } catch (error) {

  }
};

useEffect(() => {
  getUser();
});

// Función Actualizar contraseña
const UpdatePassword = async(e) =>{
  e.preventDefault()

  // Validacion de que la nueva contraseña y la confirmacion sean iguales
  if (newPassword !== confirmPassword) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'La nueva contraseña y la confirmación no coinciden',
      confirmButtonText: 'OK',
      customClass: {
        title: 'titleUpdateIncorrect',
        content: 'textUpdatePass',
        confirmButton: 'btnIncorrectPass',
      },
    });
    return;
  }
  const User = {
    currentPassword, email, newPassword
  };
  try {
    const response = await axios.patch('https://localhost:5000/api/users/updatePassword', User)
    // const response = await axios.patch('https://backend-space-parking.onrender.com/api/users/updatePassword', User)
    correctUpdatePass();
    setEditingPassword(false)
    if (response.data.status === 'Verified') {
      correctUpdatePass();
      setEditingPassword(false);
    } else if (response.data.status === 'Incorrect Current Password') {
      incorrectUpPassword();
    }
  }catch (error) {
    incorrectUpPassword()
  }
}
  
  
    return (
      <div className="user-profile">
        <Modal ariaHideApp={false} className="modalVehicle" isOpen={showModal} onRequestClose={vehicleModal} >
      <h2>Solicitud de Vehículo</h2>
        </Modal>
        <header className='headerUser'>
        <Link className='links' to='/'>
          <i className='icon-home'></i>
        </Link>

          <h2 id='tittleMusic'>R.M MUSIC</h2>

            
          <h3 >Datos Personales</h3>
          <img onClick={toggleDiv} className='iconProfile' src="https://res.cloudinary.com/miguelgo205/image/upload/v1690855432/carrmc/perfilMorado_vmykel.png" alt="" />
        
        {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/'>Inicio</Link>
            <hr />
            <Link className='linkOptions' onClick={closeSesion} >Cerrar Sesión</Link>
          </div>
        )
        }
        </header>
        {isEditing ? (
          
          <form className="containerInputs" onSubmit={(e) => updateData(e)} action="">
            <FormGroup value={name} onChange={(e) => setName(e.target.value)} nameInput="name" inputType="text" contLabel="Nombre" />
            <FormGroup value={cellphone} onChange={(e) => setCellphone(e.target.value)} nameInput="cellphone" inputType="number" contLabel="Teléfono" />
            
            <div className="contBtns">
              <button type='submit' >Actualizar</button>
              <button onClick={handleCancelClick}>Cancelar</button>
            </div>
          </form>
          
        ):isEditingPassword ? (
          <form className='containerInputs' onSubmit={(e) => UpdatePassword(e)} action=''>
            <FormGroup onChange={(e) => setPassword(e.target.value)} nameInput="currentPassword" inputType="password" contLabel="Contraseña Actual" />
            <FormGroup onChange={(e) => setEmail(e.target.value)} nameInput="email" inputType="email" contLabel="Correo" />
            <FormGroup onChange={(e) => setNewPassword(e.target.value)} nameInput="newPassword" inputType="password" contLabel="Nueva Contraseña" />
            <FormGroup onChange={(e) => setConfirmPassword(e.target.value)} nameInput="confirmPassword" inputType="password" contLabel="Confirmar Nueva Contraseña" />
            <div className="contFuncBtns">
                <button type='submit'>Actualizar Contraseña</button>
                <button onClick={()=> setEditingPassword(false)}>Cancelar</button>
              </div>
          </form>
        ) : (

        <div className="containerall">        
          <div className='containerInfo'>
            <div className="personalInfo">
              <p><span className='spanInfo'>Nombre: </span> {userData?.name}</p>
              <p><span className='spanInfo'>Correo: </span> {userData?.email}</p>
              <p><span className='spanInfo'>Teléfono:</span> {userData?.cellphone}</p>       
            </div>
          </div>
          <div className="contBtns">

            <button onClick={handleEditClick}>Actualizar Información</button>
            <button onClick={handleEditPassword}>Cambiar Contraseña</button>
          </div>
        </div>
        )}
      </div>
    );
  }

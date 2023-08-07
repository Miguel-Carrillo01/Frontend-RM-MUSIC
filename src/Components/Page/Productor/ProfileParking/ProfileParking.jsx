import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Logo } from '../../../UI/Logo/Logo'
import { UserDataContext } from '../../Context/UserDataProvider'
import { FormGroup } from '../../../UI/FormGroup/FormGroup'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
export const ProfileParking = () => {


  const [showDiv, setShowDiv] = useState(false);
  const navigate = useNavigate();

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };


  // Alertas de actualizacion de datos - Contraseña

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


  const {updateUserData} = useContext(UserDataContext);
  const { userData } = useContext(UserDataContext);
  const [name, setName] = useState(userData?.name);
  const [cellphone, setCellphone] = useState(userData?.cellphone);
  const [address, setAddress] = useState(userData?.address);
  const [cellphoneParking, setCellphoneParking] = useState(userData?.cellphoneParking);
  const [currentPassword, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setEditingPassword] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleEditPassword = () => {
    setEditingPassword(true);
  };


  const handleCancelClick = () => {
    setIsEditing(false);
  };


  // Logica de Actualizacion de datos

  useEffect(() => {
    if (!name && !cellphone && !address && !cellphoneParking) {
      setName(userData?.name);
      setCellphone(userData?.cellphone);
      setAddress(userData?.address);
      setCellphoneParking(userData?.cellphoneParking);
    }
  }, [userData, cellphone, address, cellphoneParking, name]);


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
    // const response = await axios.patch('http://localhost:5000/api/users/updatePassword', User)
    const response = await axios.patch('https://backend-space-parking.onrender.com/api/users/updatePassword', User)
    correctUpdatePass();
    setEditingPassword(false)
    if (response.data.status === 'Verified') {
      correctUpdatePass();
      setEditingPassword(false);
    } else if (response.data.status === 'Incorrect Current Password') {
      incorrectUpPassword();
    }
  } catch (error) {
    incorrectUpPassword()
  }
}

// Envio de los datos  a la peticion Actualizar datos
 const UpdateData = async(e) => {
  e.preventDefault()
  const User = {
    name, cellphone, address, cellphoneParking   
  };
 
 try {
  //  await axios.patch(`http://localhost:5000/api/users/updateUserParking/${userData.idUserParking}`, User);
   await axios.patch(`https://backend-space-parking.onrender.com/api/users/updateUserParking/${userData.idUserParking}`, User);
  correctUpdateData();
  setIsEditing(false);
  // Actualizar los datos del usuario después de que se haya realizado la actualización
  getUser()
  } catch (error) {
    console.log(error.message);
  incorrectUpData()
  }
}



// Peticion de obtener el usuario luego de actualizar los datos
const getUser = useCallback( async () => {
  try {
    if (userData?.email) {
      const response = await axios.post(
        // 'http://localhost:5000/api/users/meUserParking',
        'https://backend-space-parking.onrender.com/api/users/meUserParking',
        { email: userData?.email }
      );
      updateUserData(response.data);
    }
  } catch (error) {
    console.log(error);
  }
}, [userData, updateUserData]);

useEffect(() => {
  // Actualizar los datos del usuario solo cuando cambie el estado userData
  getUser();
}, [userData, getUser]);

  return (
    <div className='parkingProfile'>
      <header className='headerParking'>
        <Logo to='/HomeParking' idLogo='logoHomeUser' />
        <h3 id='nameUser'>{userData?.nameParking}</h3>
        {/* <i className='icon-bell'></i> */}
        <div onClick={toggleDiv} className='contIcon'>
          <i className='icon-user'></i>
        </div>
        {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/HomeParking'>Inicio</Link>
            <hr />
            <Link className='linkOptions' to='/'>Cerrar Sesión</Link>
          </div>
        )
        }
      </header>
      {isEditing ? (
            <form className='containerInputs' onSubmit={(e) => UpdateData(e)} action="">
              <FormGroup value={name} onChange={(e) => setName(e.target.value)} nameInput="name" inputType="text" contLabel="Nombre"/>
              <FormGroup value={cellphone} onChange={(e) => setCellphone(e.target.value)} nameInput="cellphone" inputType="number" contLabel="Teléfono"/>
              <FormGroup value={address} onChange={(e) => setAddress(e.target.value)} nameInput="address" inputType="text" contLabel="Dirección"/>
              <FormGroup value={cellphoneParking} onChange={(e) => setCellphoneParking(e.target.value)} nameInput="cellphoneParking" inputType="number" contLabel="Teléfono Parqueadero"/>
              <div className="contFuncBtns">
                <button type='submit'>Actualizar</button>
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
      <main className="containerall">        
          <div className='containerInfo'>
            <div className="personalInfo">
              <h4>Información Personal</h4>
              <p><span className='spanInfo'>Nombre: </span> {userData?.name}</p>
              <p><span className='spanInfo'>Correo: </span> {userData?.email}</p>
              <p><span className='spanInfo'>Teléfono:</span> {userData?.cellphone}</p>
              <p><span className='spanInfo'>No. Identificación:</span> {userData?.idUserParking}</p>
              <p><span className='spanInfo'>Nit:</span> {userData?.nit}</p>
              {/* <p><span className='spanInfo'>No. Licencia:</span> {userData?.license}</p> */}
            </div>


            <div className="parkingInfo">
              <h4>Información Parqueadero</h4>
              
              <p><span className='spanInfo'>Nombre Parqueadero: </span> {userData?.nameParking}</p>
              <p><span className='spanInfo'>Dirección: </span> {userData?.address}</p>
              <p><span className='spanInfo'>Teléfono Parqueadero: </span> {userData?.cellphoneParking}</p>
              <p><span className='spanInfo'>Hora inicio: </span> {userData?.hourStart}</p>
              <p><span className='spanInfo'>Hora Fin: </span> {userData?.hourEnd}</p>
            </div>
            
          </div>
          <div className="contFuncBtns">
            <button onClick={handleEditClick}>Actualizar Información</button>
            <button onClick={handleEditPassword}>Cambiar Contraseña</button>
          </div>

        </main>
        )}
    </div>
  )
}

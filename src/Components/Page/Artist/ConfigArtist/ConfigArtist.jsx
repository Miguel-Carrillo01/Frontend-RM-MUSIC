import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ConfigArtist.css"
import { UserDataContext} from '../../Context/UserDataProvider';
import Modal from 'react-modal';
import axios from 'axios';
import { FormGroup } from '../../../UI/FormGroup/FormGroup';
import Swal from 'sweetalert2';

export const ConfigArtist = () => {
    const {userData} = useContext(UserDataContext);
    const {updateUserData} = useContext(UserDataContext);
    const [songList, setSongList] = useState([userData?.songs]);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setEditingPassword] = useState(false);
    const [name, setName] = useState(userData?.name);
    const [cellphone, setCellphone] = useState(userData?.cellphone);
    const [biography, setBiography] = useState(userData?.biography);
    // Cambio de Contraseña
    const [currentPassword, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()

    // ADD SONG
    const [nameSong, setNameSong] = useState('');
    const [linkSong, setLinkSong] = useState('');
    const [imgSong, setImgSong] = useState('');

    const closeSesion = async () => {
        navigate(`/`);
        localStorage.clear();
        window.location.reload();
      }

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
              localStorage.clear();
              window.location.reload();
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

    const [showDiv, setShowDiv] = useState(false);
    const toggleDiv = () => {
      setShowDiv(!showDiv);
    };

    const handleCancelClick = () => {
      setIsEditing(false);
      setEditingPassword(false);
    };



      const handleEditClick = () => {
        setIsEditing(true);
      };

      
  
      const handleEditPassword = ()=>{
        setEditingPassword(true)
      }


  const updateData = async(e) => {
    e.preventDefault()
    const User = {
      name, cellphone, biography
      };
        
      try {
        console.log(User);
        await axios.patch(`http://localhost:5000/api/users/updateUserArtist/${userData?.email}`, User);
            // await axios.patch(`https://backend-space-parking.onrender.com/api/users/updateUser/${userData?.idUser}`, User);
        getUser()
        setIsEditing(false);
        correctUpdateData();
      } catch (error) {
        incorrectUpData()
        console.log(error);
       }
       }


       const getUser = async () => {
        try {
          if (userData?.email) {
            const response = await axios.post('http://localhost:5000/api/users/meUserArtist', { email: userData?.email });
            updateUserData(response.data);
            setSongList(response.data.songs);
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


// AGREGAR CANCION
const addSongModal = () => {
  setShowModal(!showModal);
  console.log(userData);
};


     // SUBIR CANCION
     const handleSongChange = async (e) => {
      const file = e.target.files[0];
    
      if (!file) return;
    
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', 'carrmc');
      formData.append('api_key', '975486234138471');
      formData.append('timestamp', Math.floor(Date.now() / 1000));
      formData.append('folder', 'carrmc/songs');
    
      return axios
      .post('https://api.cloudinary.com/v1_1/miguelgo205/raw/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
    .then((response) => {
      const data = response.data;
      const audioURL = data.secure_url;
      setLinkSong(audioURL);
    });
  };


      // IMAGEN CANCION
      const handleFileSongChange = async (e) => {
        const file = e.target.files[0];
      
        if (!file) return;
      
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tags', 'codeinfuse, medium, gist');
        formData.append('upload_preset', 'carrmc');
        formData.append('api_key', '975486234138471');
        formData.append('timestamp', Math.floor(Date.now() / 1000));
        formData.append('folder', 'carrmc/SongsImages');
      
        return axios
        .post('https://api.cloudinary.com/v1_1/miguelgo205/image/upload', formData, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          setImgSong(fileURL);
      });
    };


    const deleteSong = async (index) => {
      try {
        // Realiza la lógica de eliminación del vehículo utilizando el índice
        const updatedSongs = [...songList];
        updatedSongs.splice(index, 1);
        setSongList(updatedSongs);
    
        // Realiza la solicitud HTTP para eliminar el vehículo del backend
       await axios.delete(`http://localhost:5000/api/users/deleteSong/${userData?.email}/${songList[index]?._id}`);
    
        // Muestra una alerta o realiza cualquier otra acción deseada
        Swal.fire({
          icon: 'success',
          title: 'Canción eliminado',
          text: 'Canción eliminada correctamente',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.log(error);
        // Muestra una alerta o realiza cualquier otra acción deseada en caso de error
        Swal.fire({
          icon: 'error',
          title: 'Error al eliminar el vehículo',
          text: 'Ocurrió un error al intentar eliminar el vehículo.',
          confirmButtonText: 'OK',
        });
      }
    };


    const addSong = async(e) => {
      
      e.preventDefault()
      if (!nameSong || !linkSong || !imgSong) {
        console.log("Por favor, completa todos los campos antes de agregar la canción.");
        return;
      }
      
      const song = {
        nameSong, linkSong, imgSong
      };
      console.log(song);
      
      try {
        console.log(song);
        console.log(userData?.email);
        await axios.post(`http://localhost:5000/api/users/addSongs/${userData?.email}`, song);
    
        getUser();
        // vehicleModal();
        addSongModal()
        // correctAddVehicle();
    
       } catch (error) {
       incorrectUpData()
      console.log(song);

       console.log(error);
     }
     }
    


  return (
    <div id='pageConfigArtist'>

      {/* modal add vehicle */}
      <Modal ariaHideApp={false} className="modalAddSong" isOpen={showModal} onRequestClose={addSongModal} >
      <h2>Agrega Tu Canción</h2>
      <form className='containerInputsVehicle' onSubmit={(e) => addSong(e)} >
        <FormGroup onChange={(e) => setNameSong(e.target.value)} nameInput="nameSong" contLabel="Nombre Canción" place="Nombre Canción " inputType="text"/>
        
        <div className="input-group">
                        <label htmlFor="Linksong">Canción</label>
                        <input onChange={handleSongChange}  type="file" name="LinkSong" id="LinkSong" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="imgSong">Portada De Canción</label>
                        <input onChange={handleFileSongChange}  type="file" name="imgSong" id="imgSong" required />
                    </div>



                
        <button type="submit">Agregar</button>
      </form>
        </Modal>


        <header className='headerConfig'>
            <h2 id='tittleMusic'>R.M. MUSIC</h2>
            <h3 id='nameUser'> Bienvenid@ {userData?.name}</h3>
            <Link className="linkConfig" onClick={closeSesion} >Cerrar Sesión</Link>
        </header>
        {isEditing ? (
          
          <form className="containerInputs" onSubmit={(e) => updateData(e)} action="">
            <FormGroup value={name} onChange={(e) => setName(e.target.value)} nameInput="name" inputType="text" contLabel="Nombre" />
            <FormGroup value={cellphone} onChange={(e) => setCellphone(e.target.value)} nameInput="cellphone" inputType="number" contLabel="Teléfono" />
            <textarea value={biography} onChange={(e) => setBiography(e.target.value)} name="biography" id="biographyConfig"  maxLength={310} cols="55" rows="8"></textarea>
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
        <main className='mainConfig'>

          
            <h2>Configura tu perfil</h2>

            <div className="containerContent">
                <div className="profileData">
                    <p><span className='spanInfo'>Nombre: </span> {userData?.name}</p>
                    <p><span className='spanInfo'>Correo: </span> {userData?.email}</p>
                    <p><span className='spanInfo'>Teléfono:</span> {userData?.cellphone}</p>
                    <p><span className='spanInfo'>Pais:</span> {userData?.country}</p>
                    <p><span className='spanInfo'>Biografía:</span> {userData?.biography}</p>
                </div>
                <div className="profileSongs">
                    <h3>Mis Canciones</h3>
                    {songList && songList.map((song, index) => (
                    <li className='oneSongConfig' key={index}>
                        <img className='oneImage' src={song?.imgSong} alt="" />
                        <p key={index}  className={`ttYArt  ${ "active"}`}>
                        <span className='oneSongTitle'>
                            {song?.nameSong}
                        </span>
                        </p>
                        <i onClick={() => deleteSong(index)} className="icon-trash"></i>
                        <i className="icon-pencil"></i>
                    </li>
                    ))}
                    {songList.length < 2 && (
                <div onClick={addSongModal}  className="addSong">
                  +
                </div>
              )}
                    <div className="contBtnsConfig">

                      <button onClick={handleEditClick}>Actualizar Información</button>
                      <button onClick={handleEditPassword}>Cambiar Contraseña</button>
                    </div>
                </div>
            </div>
        </main>
        )}
    </div>
  )
}

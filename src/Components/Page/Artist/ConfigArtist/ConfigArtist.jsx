import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./ConfigArtist.css"
import { UserDataContext} from '../../Context/UserDataProvider';
import axios from 'axios';

export const ConfigArtist = () => {

    const {userData} = useContext(UserDataContext);
    const [dataArtist, setDataArtist] = useState()
    const [songList, setSongList] = useState(userData?.songs);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setEditingPassword] = useState(false);
    const navigate = useNavigate()
    // console.log(userData);

    const closeSesion = async () => {
        navigate(`/`);
        localStorage.clear();
        window.location.reload();
      }

    const [showDiv, setShowDiv] = useState(false);
    const toggleDiv = () => {
      setShowDiv(!showDiv);
    };


    useEffect(() => {
      const getArtist = async () => {
          // console.log(userData?.email);
          try {
              const response = await axios.post('http://localhost:5000/api/users/meUserArtist', { email: userData?.email });
              setDataArtist(response.data);
              setSongList(response.data.songs);
              // console.log(songList);
          } catch (error) {
              console.log(error);
          }
      };

      getArtist();
  }, [userData?.email, songList]);


      const handleEditClick = () => {
        setIsEditing(true);
      };
  
      const handleEditPassword = ()=>{
        setEditingPassword(true)
      }

  return (
    <div id='pageConfigArtist'>
        <header className='headerConfig'>
            <h2 id='tittleMusic'>R.M. MUSIC</h2>
            <h3 id='nameUser'> Bienvenid@ {userData?.name}</h3>
            <Link className="linkConfig" onClick={closeSesion} >Cerrar Sesión</Link>
        </header>
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
                    <li className='oneSong' key={index}>
                        <img className='oneImage' src={song.imgSong} alt="" />
                        <p key={index}  className={`ttYArt  ${ "active"}`}>
                        <span className='oneSongTitle'>
                            {song?.nameSong}
                        </span>
                        </p>
                        <i className="icon-trash"></i>
                    </li>
                    ))}
                    <div className="contBtns">

                      <button onClick={handleEditClick}>Actualizar Información</button>
                      <button onClick={handleEditPassword}>Cambiar Contraseña</button>
                    </div>
                </div>
            </div>
        </main>

    </div>
  )
}

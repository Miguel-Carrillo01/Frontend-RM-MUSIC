import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserDataContext} from '../../Context/UserDataProvider'
import axios from 'axios';
export const DetailArtist = () => {

  const { userData } = useContext(UserDataContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encodedEmail = searchParams.get('email');
  const decodedEmail = encodedEmail ? atob(encodedEmail) : null;
  const [dataArtist, setDataArtist] = useState()
  const [isLiked, setIsLiked] = useState(false);

  
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const closeSesion = async () => {
    navigate(`/`);
    localStorage.clear();
    window.location.reload();
  }


  // const initialSongList = [
  //   {
  //     title: 'Domingo',
  //     audioUrl: 'https://res.cloudinary.com/miguelgo205/video/upload/v1690425582/carrmc/songs/domingo_lubv1w.m4a',
  //     // coverUrl: 'https://ruta/del/cover1.jpg',
  //     artist: 'Milo J',
  //     urlImageSong: 'https://res.cloudinary.com/miguelgo205/image/upload/v1690337271/carrmc/SongsImages/download_md6aww.jpg',
  //     // duration: getDuration("https://res.cloudinary.com/miguelgo205/video/upload/v1690090318/carrmc/songs/Ozuna_-_En_La_Intimidad_Trap_Cartel_opbfnl.mp3"),
  //   },
  //   {
  //     title: 'Milagrosa',
  //     audioUrl: 'https://res.cloudinary.com/miguelgo205/video/upload/v1690425581/carrmc/songs/milagrisa_x41esk.m4a',
  //     // coverUrl: 'https://ruta/del/cover2.jpg',
  //     artist: 'Milo J',
  //     urlImageSong: 'https://res.cloudinary.com/miguelgo205/image/upload/v1690340126/carrmc/SongsImages/maxresdefault_pbdido.jpg',
  //   },
  //   // Agrega más objetos de canciones aquí
  // ];

  const getArtist = async () => {
    try {
      if (decodedEmail) {
        // const response = await axios.post('https://backend-space-parking.onrender.com/api/users/meUserParking', { email: decodedEmail });
        const response = await axios.post('http://localhost:5000/api/users/meUserArtist', { email: decodedEmail });
        setDataArtist(response.data);
        // console.log(dataArtist);
        // console.log(response.data.songs);
        setSongList(response.data.songs)
        // console.log(songList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtist();
  }, []);



  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [songImage, setSongImage] = useState("https://res.cloudinary.com/miguelgo205/image/upload/v1690341028/carrmc/SongsImages/default_bmcdug.jpg");

  const [isPlaying, setIsPlaying] = useState(false);


  const [songList, setSongList] = useState();
  const [actualSong, setActualSong] = useState(null);
  const audioRef = useRef(null);
  const isInitialMount = useRef(true);
  
  const [volumeShow, setVolumeShow] = useState(90);
  const progressRef = useRef(null);




  const loadSong = (songIndex) => {
    if (songIndex !== actualSong) {
      changeActiveClass(actualSong, songIndex);
      setActualSong(songIndex);
      setSongTitle(songList[songIndex].nameSong);
      setArtistName(dataArtist?.name);
      setSongImage(songList[songIndex].imgSong);
      audioRef.current.src = songList[songIndex].linkSong;
      setIsPlaying(true); // Establecer isPlaying como true al cargar una nueva canción
      audioRef.current.play().catch((error) => {
        // Opción de manejo de error
        console.error("Error al reproducir el audio:", error);
      });
    }
  };

  useEffect(() => {
    // Reproducir la canción automáticamente solo después de la primera renderización
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Si isPlaying es true, reproducir la canción después de cargarla
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        // Opción de manejo de error
        console.error("Error al reproducir el audio:", error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);


  const playSong = () => {
    if (audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        // Opción de manejo de error
        console.error("Error al reproducir el audio:", error);
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  // Pausar canción

  // Ajustar volumen
  const volumeChange = (event) => {
    const volume = event.target.value;
    audioRef.current.volume = volume / 100;
    setVolumeShow(volume);
  };

  const muteVolume = () => {
    const volume = 0;
    audioRef.current.volume = volume;
    setVolumeShow(volume); // Actualizar el estado de volumeShow a 0
  };


    // Actualizar barra de progreso de la canción
    const updateProgress = () => {
      const { currentTime, duration } = audioRef.current;
      const percent = (currentTime / duration) * 100;
      progressRef.current.style.width = `${percent}%`;
    };
  
    // Hacer la barra de progreso clicable
    const setProgress = (event) => {
      const totalWidth = progressRef.current.offsetWidth;
      const progressWidth = event.nativeEvent.offsetX;
      const current = (progressWidth / totalWidth) * audioRef.current.duration;
      audioRef.current.currentTime = current;
    };


    const changeActiveClass = (lastIndex, newIndex) => {
      const links = document.querySelectorAll("p");
      if (lastIndex !== null) {
        links[lastIndex].classList.remove("active");
      }
      links[newIndex].classList.add("active");
    };

    // likes
    useEffect(() => {
      // Verificar si el usuario ya dio like al artista en el localStorage
      if (dataArtist) {
        const artistId = dataArtist._id; // Reemplaza esto con el campo adecuado que contiene el ID del artista
        const isLikedInLocalStorage = localStorage.getItem(artistId) === 'true';
        setIsLiked(isLikedInLocalStorage);
      }
    }, [dataArtist]);

    const handleLike = async () => {
      try {
        if (!userData) {
          // Si el usuario no está logueado, puedes redirigirlo a la página de inicio de sesión
          navigate('/LogIn');
          return;
        }
        const artistId = dataArtist._id; // Reemplaza esto con el campo adecuado que contenga el ID del artista

        // Verificar si el usuario ya dio like a este artista en el localStorage
        const isLikedInLocalStorage = localStorage.getItem(artistId) === 'true';
    
        if (!isLikedInLocalStorage) {
          // Hacer la solicitud al backend para dar like al artista
          const response = await axios.post(`http://localhost:5000/api/users/addLikeArtist/${dataArtist.email}`);
          
          if (response.status === 200) {
            setIsLiked(true);
    
            // Guardar la información en el localStorage
            localStorage.setItem(artistId, 'true');
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div id='pageDetail'>
        <header className='headerDetail'>
          <Link className='links' to='/'>
          <i className='icon-home'></i>
          </Link>

          <h2 id='tittleMusic'>R.M. MUSIC</h2>

           
          {userData ? ( // Si userData existe (el usuario ha iniciado sesión)
          <>
           <img onClick={toggleDiv} className='iconProfile' src="https://res.cloudinary.com/miguelgo205/image/upload/v1690855432/carrmc/perfilMorado_vmykel.png" alt="" />
        
        {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/'>Inicio</Link>
            <hr />
            <Link className='linkOptions' onClick={closeSesion} >Cerrar Sesión</Link>
          </div>
        )
        }
        </>
          ) : ( // Si userData no existe (el usuario no ha iniciado sesión)
          <>
            <Link className='links' to='/LogIn'>Inicia Sesión</Link>
            <Link className='links' to='/CreateAccount'>Crea Una Cuenta</Link>
          </>
          )}
          
        </header>
        <hr />

        <main id='mainDetailSong'>


          <div className="showSongs">
          {userData && (
            <div className="user-info">
              {userData.roles === 'producer' && (
                <div className="producer-info">
                  <p> <span>Número del artista:</span> {dataArtist?.cellphone}</p>
                  <p> <span>Correo del artista:</span>  {dataArtist?.email}</p>
                </div>
              )}
            </div>
          )}
          {songList && songList.map((song, index) => (
          <li className='oneSong' onClick={() => loadSong(index)} key={index}>
            <img className='oneImage' src={song.imgSong} alt="" />
            <p key={index}  className={`ttYArt  ${index === actualSong ? "active" : ""}`}>
              <span className='oneSongTitle'>
                {song?.nameSong}
              </span>
              <span id='guion'>-</span>
              <span className='oneArtist'>
                {dataArtist?.name}
              </span>
            </p>
          </li>
        ))}
          </div>


          <div className="infoArtist">

          <img alt='' id="coverInfo" src={dataArtist?.profileImg} />
          {userData && (
            <i onClick={handleLike} className={`icon-heart ${isLiked ? 'liked' : ''}`}></i>
        )}
          <p id='artistBio'>
            {dataArtist?.biography}
          </p>

          </div>

        </main>

        <footer className='footerSong'>
          <audio  ref={audioRef} id="audio"  onTimeUpdate={updateProgress}>
          {songList && songList.map((song, index) => (
            <source key={index} src={song?.linkSong} type="audio/mp3" />
          ))}
          </audio>

          {songList && (
            <div className="left">
              <img alt='' id="cover" src={songImage} />
              <div className="song_detail">
                <p id="title">{songTitle}</p>
                <p id="artist">{artistName}</p>
              </div>
            </div>
          )}
        


        <div className="right">
            {/* <!--- controles ---> */}
            <section className="controls">
                <div className="middle">
                <i className="fas fa-step-backward" id="prev"></i>

                {isPlaying ? (
                  <i className="fa fa-pause" id="play" onClick={playSong}></i>
                  ) : (
                  <i className="fa fa-play" id="play" onClick={playSong}></i>
                )}


              <i className="fas fa-step-forward" id="next"></i>
                </div>
                {/* <!-- - duracion de la cancion ---> */}
                {/* <div id="progress-container" className="progress-container">
                    <input type="range" min="0" max="100"  id="progress" />
                </div> */}

            <div id="progress-container" className="progress-container" onClick={setProgress}>
              <div id="progress" className="progress" ref={progressRef}></div>
            </div>
            </section>
            <div className="volume"> 
                <p id="volume_show">{volumeShow}</p>
                <i className="fa fa-volume-up" aria-hidden="true" id="volume_icon"  onClick={muteVolume}></i>
                <input type="range" min="0" max="100"  id="volume" value={volumeShow} onChange={volumeChange}/>  
            </div>
        </div>
        </footer>


       
    </div>
  )
}

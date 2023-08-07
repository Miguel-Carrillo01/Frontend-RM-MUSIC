import React, { useState, useEffect, useContext } from 'react'
import "./HomeUser.css"
import { CardArtist } from '../../../Layouts/CardArtist/CardArtist'


import { UserDataContext} from '../../Context/UserDataProvider'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export const HomeUser = () => {
  const { userData} = useContext(UserDataContext);
  // const [artistImages, setArtistImages] = useState({});

  // const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // RENDERIZADO DE PARQUEADREOS 
  const [artists, setartists] = useState([]);

  const apiGetArtists = "http://localhost:5000/api/users/getAllArtist"
  // const apiGetArtists = "https://backend-space-parking.onrender.com/api/users/getParking"


  const closeSesion = async () => {
    navigate(`/`);
    localStorage.clear();
    window.location.reload();
  }
  

  const getartists = async () => {
    try {
      const answer = await axios.get(apiGetArtists);
      setartists(answer.data);
      const images = {};
      answer.data.forEach((artist) => {
        if (artist.allUrls && artist.allUrls.length > 0) {
          const urls = artist.allUrls.split(',');
          images[artist.idUserArtist] = urls[0];
        }
      });
      // setArtistImages(images);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getartists();
  }, []);

  // const SearchArtist = (event)=>{
  //   const searchValue = event.target.value

  //   if (searchValue ==="") {
  //     getartists()
  //   }
  //   else{
  //     const searchingArtists = async () => {
  //       try {
  //         // const searching = await axios.post("http://localhost:5000/api/users/search", {searchTerm: searchValue})
  //         const searching = await axios.post("https://backend-space-parking.onrender.com/api/users/search", {searchTerm: searchValue})
  //         setartists(searching.data)
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     searchingArtists()
  //   }
  // }


    const isOpen = (item) => {
      const encodedEmail = btoa(item.email);
      navigate(`/DetailArtist?email=${encodedEmail}`);
    }

    const [showDiv, setShowDiv] = useState(false);
    const toggleDiv = () => {
      setShowDiv(!showDiv);
    };


  // console.log(styles);
  return (
    <div id='HomeUser'>
      {/* <ModalDetails functionGetItem={itemSelected} isOpen={isOpenDetail}  onRequestClose={handleCloseDetail} closeModal={handleCloseDetail}/> */}
        <header className='headerUser'>
          <h2 id='tittleMusic'>R.M. MUSIC</h2>
          
          {userData ? ( // Si userData existe (el usuario ha iniciado sesión)
          <>
            <h3 id='nameUser'>{userData?.name}</h3>
            <img className='iconProfile' onClick={toggleDiv} src="https://res.cloudinary.com/miguelgo205/image/upload/v1690855432/carrmc/perfilNormal_igposb.png" alt="" />
          </>
        ) : ( // Si userData no existe (el usuario no ha iniciado sesión)
          <>
            <Link className='links' to='/LogIn'>Inicia Sesión</Link>
            <Link className='links' to='/CreateAccount'>Crea Una Cuenta</Link>
          </>
        )}
          {showDiv && <div style={{display: 'block'}} className="optionsUser">
            <Link className="linkOptions" to="/ProfileArtist" >Perfil</Link>
            <hr />
            <Link className="linkOptions" onClick={closeSesion} >Cerrar Sesión</Link>
          </div>}
        </header>

        <main id='mainHomeUser'>

          <div className="contMessage">
            <h3>¡La nueva revelacíon!</h3>
            <p>Conoce Artistas que estan comenzando en el mundo de la musica</p>
          </div>

    
          <div className="containerArtist">

            {artists.map((item, index) => (
              <CardArtist
              key={index}
              onclick={() => {isOpen(item)}}
              nameArtist={item.name}
              country={item.country}
              likes={item.likes}
              urlImage={item.profileImg}
              />
            ))}

            <CardArtist 
            nameArtist={"Mora"}
            country={"Puerto Rico"}
            urlImage={"https://res.cloudinary.com/miguelgo205/image/upload/v1690088744/carrmc/download_wyuehr.jpg"}
            likes={5000}
            />
          </div>     
        </main>
    </div>
  )
}

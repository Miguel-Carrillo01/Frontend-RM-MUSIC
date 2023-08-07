import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import SelectCountry from 'react-select-country-list';
import Select from 'react-select'; 

export const CreateArtist = () => {

	const navigate = useNavigate()


    // FILTRO PAIS
 
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [isCountrySelected, setIsCountrySelected] = useState(false);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSearchText(country.label);
    setIsCountrySelected(true);
  };

  const handleSearchChange = (newValue) => {
    setSearchText(newValue);
  };

  const countryOptions = SelectCountry().getData();
  const filteredCountries = countryOptions.filter(
    (country) =>
      country.label &&
      country.label.toLowerCase().includes(searchText.toLowerCase())
  );

    const [profileImg, setImagePortUrl] = useState(null);
    const [imgSong, setImageSongUrl] = useState(null);
    const [linkSong, setSongUrl] = useState(null);
    const country = selectedCountry ? selectedCountry.label : '';

    // IMAGEN PORTADA
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
    
      if (!file) return;
    
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', 'carrmc');
      formData.append('api_key', '975486234138471');
      formData.append('timestamp', Math.floor(Date.now() / 1000));
    //   formData.append('folder', 'carrmc/');
    return axios
        .post('https://api.cloudinary.com/v1_1/miguelgo205/image/upload', formData, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          setImagePortUrl(fileURL);
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
          setImageSongUrl(fileURL);
      });
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
        setSongUrl(audioURL);
      });
    };



    




      
    const accountCreate = () =>{
    Swal.fire({
      icon: 'success',
      title: 'Cuenta Creada Existosamente',
	}).then(() => {
		// Redirige a la página de inicio de sesión después de hacer clic en OK
		navigate('/LogIn'); // Asegúrate de reemplazar 'IniciaSesion' con la ruta correcta
	  });
	
  }

  const incorrectPasswords = () =>{
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las Contraseñas No Coinciden',
        confirmButtonText: 'OK',
        customClass: {
          title: 'titleUpdateIncorrect',
          content: 'textUpdatePass',
          confirmButton: 'btnIncorrectPass',
        },
      })
}


	const [inputs, setInputs] = useState({
		name: "",
		email: "", 
		cellphone: "",
		country: "",
        nameSong: "",
        biography: "",
		password: "", 
	  });


	  const { name, email, cellphone, nameSong, biography, password, confirmarContraseña} = inputs;

	  const saveInput = (e) => {
		setInputs({...inputs, [e.target.name]: e.target.value})
	  };

	const createUserArtist = async(e) => {
		e.preventDefault()
		const Usuario = {
		  name, email, cellphone, country, nameSong, linkSong, imgSong, profileImg, biography,  password,
		};
		console.log(Usuario);
	
		const confirmPassword = inputs.confirmarContraseña;
		if (password !== confirmPassword) {
		  // alert('La contraseña y la confirmación de contraseña no coinciden.');
		  incorrectPasswords()
		  return;
		}
	  
		// setLoading(true)
		try{
		  const response = await axios.post("http://localhost:5000/api/users/registerArtist", Usuario)
		//   const response = await axios.post("https://backend-space-parking.onrender.com/api/users/registerUser", Listener)
		  console.log(response.data);
		  console.log(response.data.name);
		  accountCreate()
		}catch{
		  alert("Error no se creo la cuenta")
		}
	  }







	
  return (
    <div id='pageArtist'>
		<div className="form-containerArtist">
			<h2 className="title">Crea Tu Cuenta</h2>
			<p className='textListener' >Y da a conocer tu genio musical</p>
			<form onSubmit={(e) => createUserArtist(e)} className="formArtist">
                <div className="CreateArtist">
                    <div className="input-group">
                        <label htmlFor="username">Nombre</label>
                        <input onChange={(e) => saveInput(e)} type="text" name="name" id="username" required placeholder=""/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="cellphone">Teléfono</label>
                        <input onChange={(e) => saveInput(e)} type="text" name="cellphone" id="cellphone" required placeholder=""/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Correo</label>
                        <input onChange={(e) => saveInput(e)} type="email" name="email" id="email" required placeholder=""/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="profileImmg">Foto De Perfil</label>
                        <input onChange={handleFileChange} type="file" name="profileImg" id="profileImg" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="biography">Tu biografía</label>
                        <textarea onChange={(e) => saveInput(e)} name="biography" id="biography" cols="43" maxLength={310} rows="5" required></textarea>
                        {/* <input onChange={(e) => saveInput(e)} type="text" name="biography" id="biography" required /> */}
                    </div>


                    <div className="input-group">
                        <label htmlFor="country">País</label>
                        <Select
                        id="country"
                        className='selectCountry'
                        name="country"
                        value={isCountrySelected ? selectedCountry : null}
                        options={filteredCountries.slice(0, 4)}
                        onChange={handleCountryChange}
                        onInputChange={handleSearchChange}
                        placeholder="Seleccione un país..."
                        />
                    </div>



                </div>



                <div className="createSong">
                    <p className='textCreateSong'>Es necesario registrar una canción para crear tu cuenta</p>
                    <div className="input-group">
                        <label htmlFor="NameSong">Nombre Canción</label>
                        <input onChange={(e) => saveInput(e)} type="text" name="nameSong" id="NameSong" required />
				    </div>
                    <div className="input-group">
                        <label htmlFor="Linksong">Canción</label>
                        <input onChange={handleSongChange}  type="file" name="LinkSong" id="LinkSong" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="imgSong">Portada De Canción</label>
                        <input onChange={handleFileSongChange}  type="file" name="imgSong" id="imgSong" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input onChange={(e) => saveInput(e)} type="password" name="password" id="password" required placeholder=""/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="ConfirmPassword">Confirmar Contraseña</label>
                        <input onChange={(e) => saveInput(e)} type="password" name="confirmarContraseña" id="confirmarContraseña" required placeholder=""/>
                    </div>


                </div>

				<button type='submit' className="btnCreateArtist">Crear Cuenta</button>
			</form>
		</div>
    </div>
  )
}

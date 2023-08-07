import React, { useState, useContext } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { UserDataContext } from '../../Page/Context/UserDataProvider';



export const LogIn = () => {

const navigate = useNavigate();
const {updateUserData} = useContext(UserDataContext);


const incorrect = () =>{
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Verifica los datos',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
}
const correct = () => {
  let timerInterval;
  Swal.fire({
    icon: "success",
    title: 'Bienvenido',
    timer: 1000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getPopup().querySelector('b');
      if (b) {
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      }
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      // Lógica adicional después de que se cierre la alerta
    }
  });
};

const [inputs, setInputs] = useState({
    email: "", 
    password: ""
  });
const { email, password } = inputs;


const inputLogin = (e) => {
  setInputs({...inputs, [e.target.name]: e.target.value})
};


const getData = async(e) =>{
  e.preventDefault()
  const Usuario = {
    email
  };
  
  try {
    // const response = await axios.post("https://backend-space-parking.onrender.com/api/users/rolUser", Usuario);
    const response = await axios.post("http://localhost:5000/api/users/rolUser", Usuario);
    let userRole = response.data.roles
    const typerole = userRole.slice(-1)
    onSubmitLogin(typerole)
  } catch (error) {
    incorrect()
  }
}


const onSubmitLogin = async(typerole) => {

  const Usuario = {
    email, password
  };
 
  try {
      const response = await axios.post("http://localhost:5000/api/users/login", Usuario);
      // const response = await axios.post("https://backend-space-parking.onrender.com/api/users/login", Usuario);
      updateUserData(response.data);
      if (typerole === '3') {
        navigate(`/`);
      }else if (typerole === '4'){
        navigate(`/`);
        // updateUserData(response.data);
        // console.log(response.data);
      }
      else if (typerole === '5'){
        navigate(`/ConfigArtist`)
      }
      correct()
    } catch (error) {
      incorrect()
    }
  };




  return (
    <div id='contLogin'>
      <main id='mainLogin'>

      <form onSubmit={(e) => getData(e)} className="formLogin">
      <div className="form-title"><span>Entra en la</span></div>
        <div className="title-2"><span>🎵Música🎵</span></div>
        <div className="input-container">
          <input onChange={(e) => inputLogin(e)} name='email' className="input-mail" type="email" placeholder="Correo"/>
          <span> </span>
        </div>

        <section className="bg-stars">
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
          <span className="star"></span>
        </section>

        <div className="input-container">
          <input onChange={(e) => inputLogin(e)} name='password' className="input-pwd" type="password" placeholder="Contraseña"/>
        </div>
        <button type="submit" className="submit">
          Inicia Sesión
        </button>

        <p className="signup-link">
          ¿No tienes cuenta?
          <Link  to='/CreateAccount'> Crea Una!!</Link>
        </p>
        <p className="forgotPassword">
          ¿Olvidaste tu contraseña?
          <Link  to='/RecoverPassword'> ¡Recuperala!</Link>
        </p>
        
    </form>


    <img id='imgLogIn' src="https://res.cloudinary.com/miguelgo205/image/upload/v1690595966/carrmc/smoke-clumps-abstract-lilac-wallpaper-preview_sdqlkq.jpg" alt="" />
      </main>
      
      
    </div>
  )
}

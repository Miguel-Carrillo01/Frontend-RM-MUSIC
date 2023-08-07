import React, { useState, useRef, useContext, useEffect } from 'react'
import { Img } from '../../UI/Img/Img';
import { ModalUser } from '../ModalUser/ModalUser';
import { ModalParking } from '../ModalParking/ModalParking';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { UserDataContext } from '../../Page/Context/UserDataProvider';

export const nombrePrueba = "Jhon rios";
export const MainLogIn = () => {
  const {updateUserData} = useContext(UserDataContext);


    // Ventanas de validación 
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

     //Connect Backend and Frontend
     // const navigate = useNavigate();
     // Inicio De Sesión
     const [inputs, setInputs] = useState({
         email: "", 
         password: ""
       });
      const { email, password } = inputs;


    const onChange = (e) => {
      setInputs({...inputs, [e.target.name]: e.target.value})
    };

    const getData = async(e) =>{
      e.preventDefault()
      const Usuario = {
        email
      };
      
      try {
        const response = await axios.post("https://backend-space-parking.onrender.com/api/users/rolUser", Usuario);
        // const response = await axios.post("http://localhost:5000/api/users/rolUser", Usuario);
        let userRole = response.data.roles
        const typerole = userRole.slice(-1)
        onSubmitLogin(typerole)
      } catch (error) {
        incorrect()
      }
    }

      const navigate = useNavigate();
      // const [mensaje, setMensaje] = useState();
      // const [loading, setLoading] = useState(false);
    
    
      
    
      const onSubmitLogin = async(typerole) => {

        const Usuario = {
          email, password
        };
       
        try {
            // const response = await axios.post("http://localhost:5000/api/users/login", Usuario);
            const response = await axios.post("https://backend-space-parking.onrender.com/api/users/login", Usuario);
            updateUserData(response.data);
            if (typerole === '5') {
              navigate(`/HomeUser/`);
            }else {
              navigate(`/HomeParking/`);
              // updateUserData(response.data);
              // console.log(response.data);
            }
            correct()
          } catch (error) {
            incorrect()
          }
        };
    // creamos un estado llamado isOpen con un valor inicial de false y una 
    // función para actualizar ese estado llamada setIsOpen.

    const overlayRight = useRef(null)

    const [isOpenUser, setIsOpenUser] = useState(false);
    const [isOpenParking, setIsOpenParking] = useState(false);


    useEffect(() => {
      if (isOpenParking || isOpenUser) {
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
      }
    }, [isOpenParking, isOpenUser]);
    
    // ESTO ES LA FUNCIONALIDAD DE MOSTRAR Y OCULTAR LA MODAL USER

    const handleOpenUser = () => {
        setIsOpenUser(true);
      };
    
      const handleCloseUser = () => {
        setIsOpenUser(false);
      };
   // ESTO ES LA FUNCIONALIDAD DE MOSTRAR Y OCULTAR LA MODAL PARKING
    const handleOpenParking = () => {
        setIsOpenParking(true);
      };
    
      const handleCloseParking = () => {
        setIsOpenParking(false);
      };


    // TRANSICION Y ANIMACION DEL LOGIN

    const [clas, setClas] = useState(false);

    const putContainer =() =>{
        setClas(true)
        overlayRight.current.style.display = 'none'
    }
    const removeContainer =() =>{
        setClas(false)
        overlayRight.current.style.display = 'flex'
    }
  return (


    <div className='mainLogin'>
        <ModalParking isOpen={isOpenParking} onRequestClose={handleCloseParking} closeModal={handleCloseParking}/>
        <ModalUser isOpen={isOpenUser} onRequestClose={handleCloseUser} closeModal={handleCloseUser}/>
        <div className='contModal'>
        </div>
        <div className={`container ${clas ? "right-panel-active" : ""}`}id="container">
            <div className={`contTitle ${clas ? "contTitle-active" : ""}`}>
                <h2 className='chooseRol' >Escoge tu rol</h2>
            </div>

            <div className="form-container sign-up-container">
            
                <div className='formRegister' id='register'>
                    <Img eventClick={handleOpenUser} styleImg="imgCreate" url="https://res.cloudinary.com/miguelgo205/image/upload/v1678346056/SpaceParking/concepto-de-servicio-uso-compartido-autom%C3%B3viles-hombre-en-l%C3%ADnea-elige-auto-para-compartir-carros-alquiler-carpool-viajes-ciudad-165740150_crpvmw.jpg"/>
                    <p className='choseeAccount'>Usuario De Espacios</p>
                </div>

            </div>


            <div className="form-container sign-in-container">
            {/* <form onSubmit={(e) => onSubmit(e)} id="login" action=""> */}
            <form onSubmit={(e) => getData(e)} id="login" action="">
                <h1 className='titleLogin'>Inicia Sesión</h1>
                <input onChange={(e) => onChange(e)} name='email' className='inputLogin' id="newUser" type="text" placeholder="Correo" required />
                <input onChange={(e) => onChange(e)} name='password' required className='inputLogin' id="newPassword" type="password" placeholder="Contraseña" />
                <button>Inicia Sesión</button>
                    <p className='chose'>O</p>
                </form>
                    <button className="ghostLogin" onClick={putContainer} >Crear Cuenta</button>


                    <Link className="forgotPassword" to="/RecoverPassword" >¿Haz Olvidado tu contraseña?</Link>
            </div>


                        
            <div className={`contLogin ${clas ? "contLogin-active" : ""}`}>
                <p className='textAccount'>Ya Tienes Una Cuenta? <br /><span id='itsLogin' onClick={removeContainer} >Inicia sesion</span> y entra en tu espacio</p>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <Img alt="Image" eventClick={handleOpenParking} styleImg="imgCreate" url="https://res.cloudinary.com/miguelgo205/image/upload/v1678334925/SpaceParking/ISOMETRIC_CAR_PARKING_ebfpvy.jpg"/> 
                        <p className='choseeAccount'>Administrador De Parqueadero</p>
                    </div>

                    <div ref={overlayRight} className="overlay-panel overlay-right">
    
                            <h1 className='titleLog'>Bienvenido A Space Parking</h1>
                            <p id="textlogin">Registrate y haz parte de nosotros</p>
                            <button className="ghost" onClick={putContainer} id="signUp">Crear Cuenta</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

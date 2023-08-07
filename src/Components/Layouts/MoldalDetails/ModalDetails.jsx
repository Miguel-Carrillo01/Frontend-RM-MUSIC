import axios from 'axios';
import React, { useContext, useState } from 'react'
import Modal from 'react-modal'
import moment from 'moment-timezone';
import { UserDataContext } from '../../Page/Context/UserDataProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export const ModalDetails = ({onRequestClose,isOpen,functionGetItem}) => {

const { userData} = useContext(UserDataContext);
const navigate = useNavigate()

const correctBooking = () =>{
  Swal.fire({
      icon: 'success',
      title: '¡Excelente!',
      html: 'Tu reserva se ha realizado correctamente',
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

const incorrectBooking = () =>{
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya tienes una reserva en progreso',
        confirmButtonText: 'OK',
        customClass: {
          title: 'titleUpdateIncorrect',
          content: 'textUpdatePass',
          confirmButton: 'btnIncorrectPass',
        },
      })
}

const createBooking = async () => {

  const currentDate = moment(); // Obtiene la fecha y hora actual
  const formattedDate = currentDate.tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');
 
    const bookingData = {
      name: `${userData?.placa}-${userData?.name}`,
      nitParking: functionGetItem?.nit, 
      idUser: userData?.idUser,
      dateStartBooking: formattedDate,  // Fecha de inicio de la reserva en formato ISO 8601
      duration: 30, // Duración de la reserva en minutos
    };

    try {
      await axios.post("https://backend-space-parking.onrender.com/api/users/createBooking", bookingData);
      alert('Reserva Realizada')
      correctBooking()

    } catch (error) {
      incorrectBooking()
      // incorrect()
    }
  }




  return (
    <Modal getItem={functionGetItem}  ariaHideApp={false} className="modalDetails" onRequestClose={onRequestClose} isOpen={isOpen}>
        <div className="contUp">
            <h3>{functionGetItem?.nameParking}</h3>
            <hr />

          <div className="containerAside">
            <div className="contImages">
              <img id='imgPrin' src="https://res.cloudinary.com/miguelgo205/image/upload/v1684815614/SpaceParking/432216777nidoo-parqueaderos-cy_i901xu.jpg" alt="" />
              {/* <div className="conttImages"> */}
              <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1684815602/SpaceParking/parqueadero1_ljazl7.jpg" alt="" />
              <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
              <img className='imgModal' src="https://res.cloudinary.com/miguelgo205/image/upload/v1679893318/SpaceParking/logoParking_uam7is.jpg" alt="" />
            
            </div>

            <hr />
            <div className="contInfoPark">
                <p> <span>Direccion:</span>{functionGetItem?.address}</p>
                <p> <span>Administrador:</span>{functionGetItem?.name}</p>
                <p> <span>Telefono:</span>{functionGetItem?.cellphone}</p>
                <p> <span>Correo:</span>{functionGetItem?.email}</p>
                <p> <span>Horarios:</span>{functionGetItem?.hourStart} - {functionGetItem?.hourEnd}</p>
                <p> <span>Precio Moto:</span>$ {functionGetItem?.priceMotorcycle} COP</p>
                <p> <span>Precio Carro:</span>$ {functionGetItem?.priceCar} COP </p>
                <button onClick={createBooking} className='btnBooking'>Reservar</button>
            </div>
        </div>

        </div>
    </Modal>
  )
}

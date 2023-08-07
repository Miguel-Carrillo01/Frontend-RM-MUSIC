import React, { useState, useContext, useEffect } from 'react';
import { Logo } from '../../../UI/Logo/Logo';
import { UserDataContext } from '../../Context/UserDataProvider';
import './HomeParking.css';
import { Circle } from '../../../UI/Circle/Circle';
import { Link } from 'react-router-dom';
import { ModalState } from '../../../Layouts/ModalState/ModalState';
import LazyLoad from 'react-lazy-load';
import Modal from 'react-modal'
import axios from 'axios';
export const HomeParking = () => {
  const { userData } = useContext(UserDataContext);

  const [isOpenStates, setIsOpenStates] = useState(false);
  const [stateSelected, setState] = useState('');
  const [spaces, setSpaces] = useState([]);
  const [bookings, setbookings] = useState([]);

  // Obtener espacios
  const getSpaces = async () => {
    try {
      if (userData?.idUserParking) {
        const response = await axios.get(`https://backend-space-parking.onrender.com/api/users/getSpacesById/${userData.idUserParking}`);
        setSpaces(response.data)
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getSpaces();
  });




  const getBookings = async () => {
    try {
      if (userData?.nit) {
        // const response = await axios.get(`http://localhost:5000/api/users/getBookingsByNitParking/${userData.nit}`);
        const response = await axios.get(`https://backend-space-parking.onrender.com/api/users/getBookingsByNitParking/${userData.nit}`);
        setbookings(response.data)
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getBookings();
  });



  const openModalState = (spaceSelected) => {
    setIsOpenStates(true);
    setState(spaceSelected);
  };

  const handleCloseState = () => {
    setIsOpenStates(false);
  };

  const [showDiv, setShowDiv] = useState(false);
  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
  const [showNoti, setShowNoti] = useState(false);
  
  const toggleNoti = () => {
    setShowNoti(!showNoti);
  };

  // console.log(spaces.length);

  return (
    <div id='homeParking'>
      <ModalState actualState={stateSelected} numberState={0} isOpen={isOpenStates} onRequestClose={handleCloseState}closeModal={handleCloseState}/>
      <header className='headerParking'>
        <Logo to='/HomeParking' idLogo='logoHomeUser' />
        <h3 id='nameUser'>{userData?.nameParking}</h3>
        <i  onClick={toggleNoti} className='icon-bell'></i>
        <Modal ariaHideApp={false} isOpen={showNoti} onRequestClose={toggleNoti} className='modalNoti'>
          <h2>Centro de Reservas</h2>
          <div className="containerNoti">
            {bookings.map((booking, index) => (
              <div className='booking' key={index}>
                <p>Tienes una reserva del <span className='spanNoti'>Usuario: </span> {booking.userName} en el {booking.spaceBooking} <span className='spanNoti'> Placa: </span> {booking.placa}, <span className='spanNoti'>Telefono: </span> {booking.cellphone} <br /> <span className='spanNoti'>fecha y hora reserva:</span> {booking.dateStartBooking}  </p>
              </div>

            ))}
          </div>
        </Modal>
        <div onClick={toggleDiv} className='contIcon'>
        
          <i className='icon-user'></i>
        </div>
        {showDiv && (
          <div style={{ display: 'block' }} className='optionsUser'>
            <Link className='linkOptions' to='/profileParking'>
              Perfil
            </Link>
            <hr />
            <Link className='linkOptions' to='/'>
              Cerrar Sesión
            </Link>
          </div>
        )}
      </header>
      <main className='mainParking'>
        <section className='infoStates'>
          <p>Estados</p>
          <div className='info'>
            <Circle id="iconInfo" state='reserved' />
            <span>Reservado</span>
          </div>
          <div className='info'>
            <Circle id="iconInfo" state='busy' />
            <span>Ocupado</span>
          </div>
          <div className='info'>
            <Circle id="iconInfo" state='notAvailable' />
            <span>No Disponible</span>
          </div>
          <div className='info'>
            <Circle id="iconInfo" state='available' />
            <span>Disponible</span>
          </div>
        </section>
        <aside className='availabilityMap'>
        {spaces.map((space) => (
          // <LazyLoad className="availabilityMap"  key={space._id} offset={100} placeholder={<div>Loading...</div>}>
            <Circle
              state={space.state}
              onClick={() => openModalState(space)}
              key={space._id} // Utiliza un identificador único para la clave de cada componente
              id={space._id} // Pasa el ID del espacio como una prop
            />
          // </LazyLoad>
        ))}
        </aside>
      </main>
    </div>
  );
};
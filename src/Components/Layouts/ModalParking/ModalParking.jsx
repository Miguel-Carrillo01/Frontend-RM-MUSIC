import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormGroup } from '../../UI/FormGroup/FormGroup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MapCreate } from '../../UI/MapCreate/MapCreate';

export const ModalParking = ({ isOpen, onRequestClose }) => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [imageUrls, setImageUrls] = useState([]);
  let uploaders = [];
  const handleLocationChange = (latlng) => {
    setLocation(latlng);
  };

  const handleFileChange = async (e) => {
    const fileList = e.target.files;
    uploaders = Array.from(fileList).map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', 'codeinfuse, medium, gist');
      formData.append('upload_preset', 'Parkings');
      formData.append('api_key', '975486234138471');
      formData.append('timestamp', Math.floor(Date.now() / 1000));
      return axios
        .post('https://api.cloudinary.com/v1_1/miguelgo205/image/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url;
          setImageUrls((prevUrls) => [...prevUrls, fileURL]);
        });
    });

    try {
      await Promise.all(uploaders);
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
    } 
  };

  const allUrls = imageUrls.join(',');
  // console.log(allUrls);

  const accountCreate = () => {
    Swal.fire({
      icon: 'success',
      title: 'Cuenta Creada Existosamente',
    });
  };


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
    name: '',
    email: '',
    cellphone: '',
    idUserParking: '',
    password: '',
    nameParking: '',
    address: '',
    cellphoneParking: '',
    nit: '',
    hourStart: '',
    hourEnd: '',
    capacity: '',
    priceCar: '',
    priceMotorcycle: '',
  });

  const { name, email, cellphone, idUserParking, password, nameParking, address, cellphoneParking, nit, hourStart, hourEnd, capacity, priceCar, priceMotorcycle, confirmPassword } = inputs;

  const onSaveData = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const sendData = async (e) => {
    e.preventDefault();

    const UsuarioParking = {
      name,
      email,
      cellphone,
      idUserParking,
      password,
      nameParking,
      address,
      cellphoneParking,
      nit,
      hourStart,
      hourEnd,
      capacity,
      priceMotorcycle,
      priceCar,
      allUrls,
      location: { lat: location.lat, lng: location.lng },
    };

    const confirmPassword = inputs.confirmPassword;
    if (password !== confirmPassword) {
      // alert('La contraseña y la confirmación de contraseña no coinciden.');
      incorrectPasswords()
      return;
    }

    try {
      await Promise.all([sendImageUpload(), sendUserData(UsuarioParking)]);
      accountCreate();
      onRequestClose(false);
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      // alert('Error: No se pudo crear la cuenta');
    }
  };

  const sendImageUpload = () => {
    return Promise.all(uploaders);
  };

  const sendUserData = (userData) => {
    // return axios.post('http://localhost:5000/api/users/registerParking', userData);
    return axios.post('https://backend-space-parking.onrender.com/api/users/registerParking', userData);
  };

  return (
    <Modal ariaHideApp={false} className="modalParking" onRequestClose={onRequestClose} isOpen={isOpen}>
      <h2 id="titleCreate">Crear Cuenta Administrador De Parqueadero</h2>

      <form onSubmit={sendData} className="createAccount">
        <div className="contAll">
          <div className="dataUser">
            <h3>Datos Personales</h3>
            <div className="contGroup">
              <FormGroup onChange={onSaveData} nameInput="name" contLabel="Nombre Completo" place="Nombre" inputType="text" />
              <FormGroup onChange={onSaveData} nameInput="email" contLabel="Correo" place="Correo" inputType="email" />
              <FormGroup onChange={onSaveData} nameInput="cellphone" contLabel="Telefono" place="Telefono" inputType="number" />
              <FormGroup onChange={onSaveData} nameInput="idUserParking" contLabel="No. Identificacion" place="No. Identificacion" inputType="number" />
              <FormGroup onChange={onSaveData} nameInput="password" minLength="6"  contLabel="Contraseña" place="Contraseña" inputType="password" />
              <FormGroup onChange={onSaveData} nameInput="confirmPassword" contLabel="Confirmar Contraseña" place="Contraseña" inputType="password" />
              <FormGroup onChange={onSaveData} nameInput="hourStart" contLabel="Hora Inicio" place="Hora Inicio" inputType="time" />
              <FormGroup onChange={onSaveData} nameInput="hourEnd" contLabel="Hora Fin" place="Hora Fin" inputType="time" />
            </div>
          </div>

          <div className="dataParking">
            <h3>Datos Parqueadero</h3>

            <div className="contGroup">
              <FormGroup onChange={onSaveData} nameInput="nameParking" contLabel="Nombre Parqueadero" place="Nombre Parqueadero" inputType="text" />
              <FormGroup onChange={onSaveData} nameInput="address" contLabel="Dirección" place="Dirección" inputType="text" />
              <FormGroup onChange={onSaveData} nameInput="cellphoneParking" contLabel="Telefono Parqueadero" place="Telefono Parqueadero" inputType="number" />
              <FormGroup onChange={onSaveData} nameInput="nit" contLabel="NIT." place="NIT." inputType="text" />
              <FormGroup onChange={onSaveData} min="10" nameInput="capacity" contLabel="Capacidad Maxima" place="Capacidad Maxima" inputType="number" />
              <FormGroup onChange={onSaveData} nameInput="priceCar" contLabel="Hora Carro" place="Hora Carro" inputType="number" />
              <FormGroup onChange={onSaveData} nameInput="priceMotorcycle" contLabel="Hora Moto" place="Hora Moto" inputType="number" />
              <FormGroup id="inputFile" onChange={handleFileChange} accept="image/*" nameInput="Images" contLabel="Imagenes Parqueadero" place="Imagenes Parqueadero" inputType="file" />
              <MapCreate messageMap="Ubica tu parqueadero" onLocationChange={handleLocationChange} />
            </div>
          </div>
        </div>

        <button id="btnCreateUserPark" type="submit">Crear Cuenta</button>
      </form>
    </Modal>
  );
};
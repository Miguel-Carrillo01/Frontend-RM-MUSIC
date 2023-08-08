import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


export const CreateProducer = () => {

	const navigate = useNavigate()

	const accountCreate = () =>{
    Swal.fire({
      icon: 'success',
      title: 'Cuenta Creada Existosamente',
	}).then(() => {
		// Redirige a la página de inicio de sesión después de hacer clic en OK
		navigate('/LogIn');
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
		password: "", 
	  });


	  const { name, email, cellphone, password, confirmarContraseña} = inputs;

	  const saveInput = (e) => {
		setInputs({...inputs, [e.target.name]: e.target.value})
	  };

	const createUserListener = async(e) => {
		e.preventDefault()
		const Usuario = {
		  name, email, cellphone, password,
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
		    const response = await axios.post("http://localhost:5000/api/users/registerProducer", Usuario)
		    console.log(response.data);
		    console.log(response.data.name);
		    accountCreate()
		}catch{
		  alert("Error no se creo la cuenta")
		}
	  }







	
  return (
    <div id='pageListener'>
		<div className="form-container">
			<h2 className="title">Crea Tu Cuenta</h2>
			<p className='textListener' >Descubre un talento y crea música</p>
			<form onSubmit={(e) => createUserListener(e)} className="form">
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
					<label htmlFor="password">Contraseña</label>
					<input onChange={(e) => saveInput(e)} type="password" name="password" id="password" required placeholder=""/>
				</div>
				<div className="input-group">
					<label htmlFor="ConfirmPassword">Confirmar Contraseña</label>
					<input onChange={(e) => saveInput(e)} type="password" name="confirmarContraseña" id="confirmarContraseña" required placeholder=""/>
				</div>
				<button type='submit' className="sign">Crear Cuenta</button>
			</form>
		</div>
    </div>
  )
}

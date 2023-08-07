import React from 'react'
import { CardAccount } from '../../UI/CardAccount/CardAccount'
import "./CreateAccount.css"
import { Link, useNavigate } from 'react-router-dom'


export const CreateAccount = () => {

  const navigate = useNavigate()


  return (
    <div>
      <div className="allCreate">
      <Link id='homeAccount' className='links' to='/'>
        <i className='icon-home'></i>
      </Link>
        <h2>Bienvenido a R.M. MUSIC</h2>
        <p>¡Empieza en tu aventura musical! <br /> ¿Eres un?</p>

        <div className="containerAccount">
          <CardAccount onClick={()=>{navigate('/CreateListener')}} icon={'https://res.cloudinary.com/miguelgo205/image/upload/v1691206334/carrmc/audifonos_efb4gv.png'} rol={"Oyente"} message={"Disfruta de la música, explora artistas y canciones en la plataforma."}/>
          <CardAccount onClick={()=>{navigate('/CreateArtist')}}  icon={'https://res.cloudinary.com/miguelgo205/image/upload/v1691206517/carrmc/microfono_gr5li5.png'} rol={"Artista"} message={"Sube lo mejor de tu repertorio e inicia en el mundo de la música "} />
          <CardAccount onClick={()=>{navigate('/CreateProducer')}}  icon={'https://res.cloudinary.com/miguelgo205/image/upload/v1691206855/carrmc/mezcla_knnx58.png'} rol={"Productor"} message={"Descubre artistas talentosos, escuchalos y crea musica junto a ellos"} />
        </div>
      </div>
    </div>
  )
}

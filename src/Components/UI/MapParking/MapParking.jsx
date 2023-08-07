import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css"
// import "./Map.css"

export const MapParking = ({nameParking, latitud, longitud}) => {
    const marker = {
        geocode: [],
        popUp: nameParking
      };
    
      if (typeof latitud === 'number' && typeof longitud === 'number') {
          marker.geocode.push(latitud, longitud);
      }
    
      const customIcon = new Icon({
        iconUrl: "https://res.cloudinary.com/dbenwgwfn/image/upload/v1682304566/Cancheros-Map/marcador-de-posicion_nrteik.png",
        iconSize: [38, 38]
      }
      )
          return (
      <div className="Bg-MapParking">
        <p className='messageMap'>Ubicación</p>
      <MapContainer center={[latitud, longitud]} zoom={16} style={{width: 400, height: 400}  }>
    <TileLayer 
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' 
    />
        <Marker position={marker.geocode} icon={customIcon}>
        <Popup>{marker.popUp}</Popup>
      </Marker>
  </MapContainer>
    </div>
  )
}
import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";

const AddMarkerOnClick = ({ setMarkerLocation }) => {
  useMapEvents({
    click: (e) => {
      setMarkerLocation(e.latlng);
    },
  });

  return null;
};

export const MapCreate = ({ messageMap, onLocationChange }) => {
  const [markerLocation, setMarkerLocation] = useState(null);

  const customIcon = new Icon({
    iconUrl: "https://res.cloudinary.com/dbenwgwfn/image/upload/v1682304566/Cancheros-Map/marcador-de-posicion_nrteik.png",
    iconSize: [38, 38]
  });


  const handleLocationChange = useCallback(
    (location) => {
      if (onLocationChange) {
        onLocationChange(location);
      }
    },
    [onLocationChange]
  );

  useEffect(() => {
    if (markerLocation) {
      handleLocationChange(markerLocation);
    }
  }, [markerLocation, handleLocationChange]);

  return (
    <div className="Bg-Map">
      <p className='messageMap'>{messageMap}</p>
      <MapContainer center={[4.541025, -75.668547]} zoom={16} style={{ width: 400, height: 400 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markerLocation && (
          <Marker position={markerLocation} icon={customIcon}>
            <Popup>Tu ubicación seleccionada</Popup>
          </Marker>
        )}
        <AddMarkerOnClick setMarkerLocation={setMarkerLocation} />
      </MapContainer>
    </div>
  );
};
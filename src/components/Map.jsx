import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";

import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../Context/CitiesContext";
import { useGeolocation } from './../hooks/useGeolocation';
import { useUrlPosition } from "../hooks/useUrlPosition";
import Button from "./Button";




export default function Map() {
  const [lat, lng] = useUrlPosition()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const { cities } = useCities()

  const { isLoading: isLoadingPosition, position: gelocationPosition, getPosition: getGelocationPosition } = useGeolocation()




  useEffect(() => {
    if (gelocationPosition) setMapPosition([gelocationPosition.lat, gelocationPosition.lng])
  }, [gelocationPosition])


  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng])

  }, [lat, lng])


  return <div className={styles.mapContainer}>
    <Button type="position" onClick={getGelocationPosition}>
      {isLoadingPosition ? 'loading' : "use your position"}
    </Button>

    <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>


      <ChangeCenter position={mapPosition} />
      <DetectClick />



      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />



      {cities.map((city) =>
        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            {city.cityName}
          </Popup>
        </Marker >
      )}
    </MapContainer>


  </div >;
}



function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null

}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

    }
  })
}

import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, Circle } from 'react-leaflet';
import React, {useRef} from 'react';
import Markers from './Markers';
import  'leaflet';
import CircleWrapper from './CircleWrapper';

//import { useLeafletContext } from '@react-leaflet/core'



const Map = ({radius, getCoord, coord, data, firstRender}) => {

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        //console.log(e.latlng);
        getCoord([e.latlng.lat, e.latlng.lng])
      }
    })
  }

  return (
      <MapContainer id='map' center={coord} zoom={13} scrollWheelZoom={true} className='h-96  m-auto'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
        <CircleWrapper coord={coord} radius={radius} firstRender={firstRender} />
        <Markers   data={data} />
        <LocationMarker />
      </MapContainer>

  )
}

export default Map
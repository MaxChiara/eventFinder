import { Marker, Popup } from 'react-leaflet';
import EvenuePopup from './EvenuePopup';

const Markers = ({data}) => {



  function renderMarkers(data){
    return(
    data.venues.map((venue) => {
      return (
        <Marker  position={[venue.latlng.lat, venue.latlng.lng]} key={venue.id} >
          <Popup >
            <EvenuePopup events={venue.events} name={venue.venueName} />
          </Popup>
        </Marker>
      )
    }))
  }

  //console.log(data)
  return (
    <>
      {data == undefined ? '' : renderMarkers(data)}
    </>
  )
}

export default Markers
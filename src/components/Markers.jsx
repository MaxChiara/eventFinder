import { MapContainer, Marker, Popup } from 'react-leaflet';
import EvenuePopup from './EvenuePopup';
import {useRef, useEffect, useState, useContext} from 'react';
import {PopupContext} from './DataVizContainer';
import { useMap } from 'react-leaflet/hooks';
import  'leaflet';
import { gsap } from "gsap";



const Markers = ({data}) => {
  const {status, toggleClosePopups, popupVenueId } = useContext(PopupContext);
  const markerRef = useRef();
  const map = useMap();
  const flyToZoom = 16;
  //const zOffset = 900;


  function setRef(popupVenueId, venueId){
    if (!popupVenueId){return null}
    if (venueId == popupVenueId){
      return markerRef
    }
    else {return null}
  }
  
  function renderMarkers(data){
    // metto in tempCoordArray le coordinate di ogni marker che aggiungo.
    // Prima di metterne uno nuovo controllo se le coordinate ci sono già.
    // Se ci sono vuol dire che 2 venues diverse hanno le stesse identiche coordinate, che non capisco come possa essere possibile ma tant'è.
    // A questo punto sfaso un attimo le coordinate che sto per inserire per fare in modo che i marker non si sovrapponino completamente. 
    let tempCoordArray = [];
    console.log('qua')
    return(
      data.venues.map((venue) => {  
          if (tempCoordArray.includes(`${venue.latlng.lat},${venue.latlng.lng}`)){
          venue.latlng.lat = (+venue.latlng.lat + 0.00005); 
          venue.latlng.lng = (+venue.latlng.lng + 0.00005); 
          
        }
        else {tempCoordArray.push(`${venue.latlng.lat},${venue.latlng.lng}`)}
      return (  
        <Marker  position={[venue.latlng.lat, venue.latlng.lng]} key={venue.id} alt={venue.id} ref={setRef(popupVenueId, venue.id)} 
          riseOnHover={true} 
          //zIndexOffset={0}
          // eventHandlers={{
          //   popupopen: (e) => {
          //     //setZIndexOffset(zOffset);
              
          //     e.target._zIndex += zOffset;
          //   },
          //   popupclose: (e) => {
          //     //setZIndexOffset(0);
          //     e.target._zIndex -= zOffset;
          //   }}} 
        >
          <Popup >
           <EvenuePopup events={venue.events} name={venue.venueName} distance={venue.distance} />
           {/* <EvenuePopup events={venue.events} name={venue.venueName} /> */}
          </Popup>
        </Marker> 
     )
    }))
  }

  useEffect(() => {
    if(status){
      map.stop();
      const coordinates = markerRef.current.getLatLng();
      map.closePopup();
      map.flyTo([coordinates.lat, coordinates.lng], flyToZoom, {duration: 0.6, easeLinearity: 1});
      setTimeout(function(){ 
        gsap.from(`#${popupVenueId}`, {y:-100,duration:0.6, ease: "bounce.out"});
      }, 700);
      setTimeout(function(){ 
        markerRef.current.openPopup(); 
      }, 900);
      toggleClosePopups();
    }
  },) // non metto [popupVenueId] perchè voglio che venga rirenderizzato anche quando popupVenueId è lo stesso valore

  if(status){
    // map.stop();
    // const coordinates = markerRef.current.getLatLng();
    // map.closePopup();
    // map.flyTo([coordinates.lat, coordinates.lng], flyToZoom, {duration: 0.6, easeLinearity: 1});
    // setTimeout(function(){ 
    //   gsap.from(`#${popupVenueId}`, {y:-100,duration:0.6, ease: "bounce.out"});
    // }, 700);
    // setTimeout(function(){ 
    //   markerRef.current.openPopup(); 
    // }, 900);
    // toggleClosePopups();
  }

 useEffect(() =>{
  document.querySelectorAll('img.leaflet-marker-icon').forEach((element) => {
    if (!element.id){
      element.id = element.alt;
      element.alt = 'map venue marker'
    }
  })
 })

  return (
    <>
      {data == undefined ? '' : renderMarkers(data)}
    </>
  )
}

export default Markers
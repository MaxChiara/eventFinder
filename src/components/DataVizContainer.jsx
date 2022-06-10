import React, {useState, useEffect, useRef} from 'react';
import Map from './Map';
import Cards from './Cards';
import Geohash from 'latlon-geohash';
import mockData from './mockData'; //TESTING!!

const DataVizContainer = ({formData}) => {
  const [apiData, setApiData] = useState();
  const [coord, setCoord] = useState([51.505, -0.09]);

  function getCoord(coordinates){
    setCoord(coordinates)
  }
  //console.log("Render di DataVizContainer.jsx");
  //console.log("GeoHash: " + Geohash.encode(coord[0], coord[1], 6));

/*
tempData = {
  eventCount:x,
  venues: [
    {
      venueName: string,
      ...
    },
  ]
}
*/
  let tempData = {
    eventCount : 0, //TESTING,
    venues: [],
  };
  function manipulateData(data) {
    // isolo la lista degli eventi
    let events = data['_embedded']?.events;
    // se non c'è la proprietà events vuol dire che siamo all'ultima pagina e abbiamo finito
    if (events == undefined) {return} 
    for (let i = 0; i < events.length; i++){
      // controllo se è fuori dal radius. Dal momento che gli eventi sono ordinati in ordine crescente di distanza
      // se è oltre il radius vuol dire che anche tutti i rimanenti sono fuori dal radius e quindi qui abbiamo finito. 
      if ((events[i].distance * 1000) > formData.radius){
        return
      }
      //controllo se è il giorno giusto
      if(events[i].dates.start.localDate != formData.date.slice(0, 10)){
        continue
      }
      tempData.eventCount += 1;
      let venueName = events[i]['_embedded'].venues[0].name;
      
      let venueNotFound = true;
      let eventNotFound = true;

      tempData.venues.forEach((venue) => {
        // vedo se tra venues c'è gia un oggetto con questa venueName
        if (venue.venueName === venueName){
          venueNotFound = false;
          // se c'è vedo se c'è anche già un evento con lo stesso nome, 
          venue.events.forEach((event) => {
            // Se c'è già vuol dire che si tratta dello stesso evento in un orario diverso, 
            // quindi aggiungo solo l'orario nell'array degli orari
            if (event.name === events[i].name){
              event.time.push(events[i].dates.start.localTime);
              eventNotFound = false
            }
          })
            // se no aggiungo tutto l'evento
            if (eventNotFound) {
              venue.events.push({
                name: events[i].name,
                time: [events[i].dates.start.localTime],
                genre: events[i].classifications[0].genre.name,
                id: events[i].id,
                images: events[i].images,
                url: events[i].url,
                venue: venueName,
              })
            }
        }
      })

      // se invece non c'è la venue la inizializzo
      if (venueNotFound) {
        tempData.venues.push({
          venueName: venueName,
          id: events[i]['_embedded'].venues[0].id,
          distance: events[i].distance,
          address: events[i]['_embedded'].venues[0].address,
          latlng: {
            lat: events[i]['_embedded'].venues[0].location.latitude,
            lng: events[i]['_embedded'].venues[0].location.longitude,
          },
          url: events[i]['_embedded'].venues[0].url,
          events : [
            {
              name: events[i].name,
              time: [events[i].dates.start.localTime],
              genre: events[i].classifications[0].genre.name,
              id: events[i].id,
              images: events[i].images,
              url: events[i].url,
              venue: venueName //so che l'ho già salvato prima ma ho fatto male i conti e mi serve anche qua 
            }
          ],
        })
      }
    }
    // se non siamo all'ultima pagina richiamo recursivamente makeApiCall per la prossima pagina
      if(data.page.number + 1 < data.page.totalPages) {
        return setTimeout(() => {
          makeApiCall(data.page.number + 1)
        }, 200)
      }
  }

  function makeApiCall(page){
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=7PWNTJ7kfnp2jP69LB5jPCMyct4ZOHaY&geoPoint=${Geohash.encode(coord[0], coord[1], 6)}&radius=${Math.ceil(formData.radius/1000)}&unit=km&localStartEndDateTime=${[formData.date, formData.endDate]}&sort=distance,asc&page=${page}&size=100`)
    .then(response => response.json())
    .then(data => {
      console.log('Raw api data: ', data);
      manipulateData(data);
      //console.log(tempData);
      setApiData(tempData)
    })
    .catch(err => console.log("Errore con la chiamata API: " + err));
  }

  const fetchCount = useRef(0)

  useEffect(()=> {
    makeApiCall(0);
    fetchCount.current += 1;
    console.log('Fetch count: ' + fetchCount.current);
  },[coord,formData])

  return (
    <>
        <Map radius={formData.radius} getCoord={getCoord} coord={coord} data={apiData} />
        <Cards data={apiData}/>
    </>
  )
}

export default DataVizContainer
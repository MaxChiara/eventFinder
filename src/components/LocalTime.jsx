import React, {useState, useEffect} from 'react';
import {apiKeyTimezone} from '../apikeys';

const LocalTime = ({coord}) => {
    const [localTime, setLocalTime] = useState();

    function fetchTimeFromCoordinates(coord){
        fetch(`http://api.timezonedb.com/v2.1/get-time-zone&key=${apiKeyTimezone}&by=position&lat=${coord[0]}&lng=${coord[1]}&fields=formatted`)
        .then(response => response.text())
        .then(data => {
          let parser = new DOMParser();
          let xml = parser.parseFromString(data, 'application/xml');
          let dateString = xml.getElementsByTagName('formatted')[0].innerHTML;
          //console.log('dateString: ', dateString)
          setLocalTime(dateString.slice(10, 16))
        })
        .catch(error => console.log('Errore nella chiamata a TimeZoneDB: ', error))
      }

    useEffect(() => {
        fetchTimeFromCoordinates(coord)
    }, [coord])

  return (
    <div className='mb-2' >
        <p>Local Time: {localTime}</p>
    </div>
  )
}

export default LocalTime
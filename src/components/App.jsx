// require("dotenv").config();
import { createContext, useState, useRef } from 'react';
import DataVizContainer from './DataVizContainer';
import SearchForm from './SearchForm';

export const DateContext = createContext(new Date().toISOString().slice(0, 19));

const App = () => {
  //const [date, setDate] = useState(new Date().toISOString().slice(0, 19));
  const [coord, setCoord] = useState([51.505, -0.09]);
  const loading = useRef(true);
  // formData viene passato a SearchForm solo per avere i valori default
  const [formData, setFormData] = useState({
    radius: 1000,
    //date: new Date().toISOString().slice(0, 19),
    date: "",
    endDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 24) ).toISOString().slice(0, 19),
  });
  const [useLocalTimeZone, setUseLocalTimeZone] = useState(false);
  


  function fetchTimeFromCoordinates(coord){
    fetch(`http://api.timezonedb.com/v2.1/get-time-zone&key=59RE9NLFZQCV&by=position&lat=${coord[0]}&lng=${coord[1]}&fields=formatted`)
    .then(response => response.text())
    .then(data => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, 'application/xml');
      let dateString = xml.getElementsByTagName('formatted')[0].innerHTML;
      //console.log('dateString: ', dateString)
      setFormData({...formData, date: dateString.replace(' ', 'T'),});
      loading.current = false;
    })
    .catch(error => console.log('Errore nella chiamata a TimeZoneDB: ', error))
  }
  if (loading.current && useLocalTimeZone){
    fetchTimeFromCoordinates(coord);
  }
  else if (!useLocalTimeZone && formData.date == ''){
    const tzoffset = (new Date()).getTimezoneOffset() * 60000
    var date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5);
    setFormData({...formData, date: date});
  }
  //2022-06-16T10:19:55


  function getInput(data){
    setFormData({...formData, ...data})
  }

  function getCoord(coords){
    setCoord(coords);
    fetchTimeFromCoordinates(coord);
  }


  //console.log('!!!!!!!!!!!' + firstRender.current == true ? firstRenderformData : formData)
  //console.log("Render di App.jsx");
  if (loading.current && useLocalTimeZone){
    return (
      <div className='min-h-screen min-w-full flex'>
        <h1 className='m-auto' >Loading</h1>
      </div>  
    )
  }
  return (
    <div className='container m-auto w-[90%] h-5/6'>
      <DateContext.Provider value={null}>
        <SearchForm  getInput={getInput} formData={formData} coord={coord} />
        <DataVizContainer formData={formData} getCoord={getCoord} coord={coord} />
      </DateContext.Provider>
    </div>
  )
}

export default App


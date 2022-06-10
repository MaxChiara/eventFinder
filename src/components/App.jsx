// require("dotenv").config();
import { useState } from 'react';
import DataVizContainer from './DataVizContainer';
import SearchForm from './SearchForm';

const App = () => {
  const [formData, setFormData] = useState({
    radius: 1000,
    date: new Date().toISOString().slice(0, 19),
    endDate: new Date(new Date().getTime() + (1000 * 60 * 60 * 48) ).toISOString().slice(0, 19),
  });
  
  function getInput(data){
    setFormData({...formData, ...data})
  }
  //console.log("Render di App.jsx");
  return (
    <div className='container m-auto w-5/6'>
      {/* formData viene passato a SearchForm solo per avere i valori default*/}
      <SearchForm  getInput={getInput} formData={formData} />
      <DataVizContainer formData={formData} />
    </div>
  )
}

export default App


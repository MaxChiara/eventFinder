import React, {useState} from 'react';
import { useFormik } from 'formik';

const SearchForm = ({getInput, formData}) => {  
      const formik = useFormik({
        initialValues: {
          radius: formData.radius,
          date: formData.date,
          endDate: formData.endDate,
          // email: '',
        },
        onSubmit: values => {
          values.endDate = new Date(new Date(values.date).getTime() + (1000 * 60 * 60 * 48)).toISOString().slice(0, 19);
          getInput(values);
        },
      });



  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input 
          type="number" 
          id="radius" 
          name='radius'
          value={formik.values.radius} 
          onChange={formik.handleChange} 
          className='border'  
          step={5}/>
        <label htmlFor="radius" className='mr-8'>Radius</label>
        <input 
          type="datetime-local" 
          id="date" 
          name='date'
          value={formik.values.date} 
          onChange={formik.handleChange} 
          className='border'/>
        <label htmlFor="date" className='mr-8'>Date</label>

        <input type='submit' value="Submit" className='border'></input>
      </form>
    </div>
  )
}

export default SearchForm
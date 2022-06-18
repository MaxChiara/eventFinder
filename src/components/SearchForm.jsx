import React, {useEffect } from 'react';
import { useFormik, useField } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const SearchForm =  ({getInput, formData, coord}) => {   
  
      const formik =  useFormik({
        initialValues: {
          radius: formData.radius,
          date: formData.date,
          endDate: formData.endDate,
          // email: '',
        },
        validate,
        onSubmit: values => {
          values.endDate = new Date(new Date(values.date).getTime() + (1000 * 60 * 60 * 24)).toISOString().slice(0, 19);
          getInput(values);
        },
      });
      function validate(values){
        const errors = {};
      
        if (values.radius % 5 != 0) {
          errors.radius = 'Must be a multiple of 5';
        } 
        return errors;
      };

      console.log('RENDERING SearchForm');

  return (
    <div className='container'>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        display: 'flex'
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
      >
        <div>
        <TextField
          type="number"
          name='radius'
          id="radius" 
          label="radius" 
          value={formik.values.radius} 
          onChange={formik.handleChange} 
          inputProps={{
            step: 5
          }}
          variant="outlined" />
          {formik.errors.radius && <div>{formik.errors.radius}</div>}
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="date"
            inputFormat="yyyy/MM/dd/"
            id="date"
            name='date'
            type="date"
            value={formik.values.date} 
            // onChange={formik.handleChange} 
            onChange={(value) => {
              value = new Date(value).toISOString().slice(0, 19);
              console.log(formik)
              formik.setFieldValue('date', value);
              //formik.handleChange({event:{target: {value: value, name: 'date', type: 'date'}}})
          }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button type="submit" sx={{width: 2}} >Apply</Button>
      </Box>
      {/* <form onSubmit={formik.handleSubmit}>
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
      </form> */}
    </div>
  )
}

export default SearchForm

{/* <div className='container'>
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
    </div> */}
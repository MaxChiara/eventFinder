import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function EventHeader({event, styleProp, onNameClick}){

    const style =  {
        mainTitle: styleProp?.mainTitle || 'h6',
        subtitle : styleProp?.subtitle || 'h7',
    };


    return(
    <div>
        <Typography sx={{color:"#250f9b"}} variant={style.mainTitle} component="div" onClick={onNameClick || null} className={onNameClick? 'm-0 hover:opacity-50 cursor-pointer' : 'm-0'} >
            {event.name}
        </Typography>
        <Typography variant={style.subtitle} className='mb-2' >
            {event.genre == "Undefined" ? "" : event.genre}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.primary" className='mx-0 my-2' >
            Schedule:&nbsp;
            {event.time.map((time, index) => {
                if (time) {
                    //time =  time == 'Continuous' ? 'Continuous' : time.slice(0, -3);
                    time = time == '23:59:00' ? 'Continuous' : time.slice(0, -3);
                    return (     
                            <span  key={index}>{time + (index == event.time.length - 1  ? "" : " / ")}</span>
                    )
                }
            })}
        </Typography>    
        
    </div>
  )}

export default EventHeader
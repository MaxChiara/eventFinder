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
        <Typography variant={style.mainTitle} component="div" onClick={onNameClick || null} className={onNameClick? 'hover:opacity-50 cursor-pointer' : ''} >
            {event.name}
        </Typography>
        <Typography variant={style.subtitle} >
            {event.genre == "Undefined" ? "" : event.genre}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {event.time.map((time, index) => {
                if (time) {
                    return (
                        <span key={index}>{time.slice(0, -3) + (index == event.time.length - 1  ? "" : " / ")}</span>
                    )
                }
            })}
        </Typography>
    </div>
  )}

export default EventHeader
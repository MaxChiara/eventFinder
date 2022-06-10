//import React from 'react'

// const EvenuePopup = ({events, name}) => {
//   return (
//     <div className='container w-full' >
//         <h1>{name}</h1>

//     </div>
//   )
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EventHeader from './EventHeader';
import { gsap } from "gsap";

function onNameClick(id){
  console.log("Event id: ", id);
  //window.scroll(0,findPos(document.getElementById(id)));
  document.querySelector(`#${id}`).scrollIntoView({
    behavior: 'smooth'
  });
  gsap.to(`#${id}`, {y:-100, rotation: 15,duration:0.3,  repeat: 1, yoyo: true, delay: 0.2, ease: CustomEase.create("custom", "M0,0 C0.13,-0.066 0.406,-0.148 0.618,-0.208 0.691,-0.228 1.01,0.628 1,1 ")})
}

function EvenuePopup({events, name}) {
    console.log('EvenuePopup events: ', events);
    const card = (
      <React.Fragment>
        <CardContent sx={{padding: 1}}>
          <Typography sx={{ fontSize: 14, margin: 1}} color="text.secondary" gutterBottom>
            {name}
          </Typography>
          {events.map((event) => <EventHeader event={event} onNameClick={() => onNameClick(event.id)} key={event.id} /> )}
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </React.Fragment>
    );


    return (
      <Box sx={{ width: 1, height: 1/2 }}>
        <Card variant="outlined"  >{card}</Card>
      </Box>
    );
}


export default EvenuePopup

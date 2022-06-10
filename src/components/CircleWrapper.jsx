import React from 'react';
import {useRef, useState, useEffect, useLayoutEffect} from  'react';
import { Circle } from 'react-leaflet';

const CircleWrapper = ({coord, radius}) => {
  const [radiusTarget, setRadiusTarget] = useState(0);
  const previousCoord = useRef(coord);


  useEffect(() =>{
    const interval = setInterval(() =>{
        if (radiusTarget < radius) {
            setRadiusTarget((previous) => previous + 5)
          }
        else if (radiusTarget > radius) {
            setRadiusTarget((previous) => previous - 5)
          }
  }, 1);
  return () => clearInterval(interval)
  }, [radiusTarget, radius])
 
  useLayoutEffect(() =>{
    setRadiusTarget(0)
  }, [coord])



  const circleOptions = {
      fillColor: 'blue',
    }
  



  return (
    <Circle  center={coord} pathOptions={circleOptions} radius={radiusTarget} />
  )
}

export default CircleWrapper
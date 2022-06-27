import React from 'react'
import MediaCard from './MediaCard'

const Cards = ({data}) => {
  console.log('Manipulated data: ', data);

  function renderCards(data){
    if(data){
      const events = data.venues.reduce((prev, current) => [...prev, ...current.events] , []);
      return events.map((event) => {
        return (<MediaCard data={event} key={event.id}  /> )
      })
      }
    }
  ;

  return (
    <div className='cardsContainer gridFallback'>
      {renderCards(data)}
    </div>
  )
}

export default Cards
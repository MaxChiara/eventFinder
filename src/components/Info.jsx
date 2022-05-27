import React, {useState} from 'react';


const jim= {
    blood:10,
    life:5,
}

const john = {
    blood: 100,
    life: 80,
}





const Info = () => {
    const [character, setCharacter] = useState({notChosen : true});

    
    function showStats(){
        if(character.notChosen) {return (<li>Choose</li>)}
        
        return Object.keys(character).map((stat, index)=> <li key={index} className={index%2==0?"bg-slate-300":""}>{stat}: {character[stat]}</li>)
        
        
    }
  return (
    <>
    <button onClick={()=>setCharacter(john)}>John</button>
    <button onClick={()=>setCharacter(jim)}>Jim</button>
    <ul >{showStats()}
    </ul>
    </>
  )
}

export default Info
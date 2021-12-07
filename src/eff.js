import {createEvent, createStore, forward, serialize, fork, allSettled} from 'effector'
import {useState} from "react";


import React from 'react';
import {useStore} from "effector-react";
import KonvaExample from "./components/KonvaExample";




const Eff = () => {

    const [item, setItem] = useState(3)
    const $count = createStore(
        [...Array(item)].map((_, i) => ({
            id: i.toString(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotation: Math.random() * 180,
            isDragging: false,
        }))
    )


    const  count =  useStore($count)

    const INITIAL_STATE = count




    return (
        <div>
           <div className="counter-btn">
               <button onClick={() => setItem(item + 1)}>+</button>
               <button onClick={() => setItem(item - 1)}>-</button>
           </div>



            <KonvaExample shapes={INITIAL_STATE}/>
        </div>
    );
};

export default Eff;
import React, {useEffect} from 'react';
import {animate, init, onWindowResize} from "./Dog";
import './Model.css';


const Model = () => {

    useEffect(() => {
        init();
        animate();

        window.addEventListener('resize', onWindowResize);
    }, []);



    return (
        <div className="model-background">
            <div id="model-window" className="">
            </div>
        </div>
    )
}

export default Model;


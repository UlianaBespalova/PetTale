import React from 'react';
import './Card.css';
import mockImg from './mockIng.png';


const Card = ({id, title, price, image}) => {

    return (
        <div className="col mb-1">
            <div className="card h-100">
                <div className="card-body">
                    <div className="card-img">
                        <img src={mockImg} className="card-img-top card-img-min" alt=""/>
                    </div>
                    <h6 className="card-title mt-3 fw-bold">{title}</h6>
                    <h4 className="card-text text-danger fw-bold">{price}</h4>
                </div>
            </div>
        </div>
    )
}

export default Card;


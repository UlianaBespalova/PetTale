import React from 'react';
import './Card.css';
import mockImg from './mockIng.png';


const Card = ({id, title, price, image}) => {

    return (
        <div className="col mb-1">
            <div className="card h-100 card-no-border">
                <div className="card-body clicable">
                    <div className="fitfit-card-img">
                        <img src={`https://${image}`} className="card-img-top fitfit-card-img-min" alt=""/>
                    </div>
                    <div className="card-title mt-3 fw-bold fitfit-item-title-text">{title}</div>
                    <h5 className="card-text fitfit-item-price-text fw-bold">{price} ₽</h5>
                </div>
            </div>
        </div>
    )
}

export default Card;


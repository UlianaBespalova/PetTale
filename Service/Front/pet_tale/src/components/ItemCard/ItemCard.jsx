import React from 'react';

const ItemCard = ({title, price, image}) => {

    const imageUrl = `https://${image}`;

    return (
        <div className="col mb-1">
            <div className="card h-100 card-no-border">
                <div className="card-body clicable">
                    <div style={{height: '180px', overflow: 'hidden'}}>
                        <img style={{minHeight: '180px', overflow: 'hidden', marginTop: '-25%'}} src={imageUrl} className="card-img"
                             alt="Изображение товара" />
                    </div>
                    <h6 className="card-title mt-3 text-small fw-bold clicable-text">{title}</h6>
                    <h4 className="card-text text-bright fw-bold">{price} ₽</h4>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;

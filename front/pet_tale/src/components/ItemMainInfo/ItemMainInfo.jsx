import React from 'react';

const SizeListItem = ({value}) => {
    return (
        <button type="button" className="btn btn-sm btn-outline-danger my-1 mx-1">{value}</button>
    )
}
//style = {{width:"35px"}}

const ItemMainInfo = (props) => {
    return (
        <div className="container h-100 px-4 position-relative">
            <h2 className="text-black fw-bold pt-5 pt-sm-0"><span>{props.price}</span> ₽</h2>
            <div className="my-4">
                <p className="my-1">Цвет: <span>{props.color}</span></p>
                <p className="my-1">Производитель: <span>{props.brand}</span></p>
            </div>
            <div className="mb-5 mb-sm-0">
                <p className="my-1">Выбор размера</p>
                <div>
                    {props.sizes.map((item) =>
                        <SizeListItem value={item[1]}/>
                    )}
                </div>
            </div>

            <div className="position-absolute bottom-0 start-2 d-grid gap-2 col-4">
                <button className="btn btn-danger" type="button">В корзину</button>
            </div>
        </div>
    )
}

export default ItemMainInfo;


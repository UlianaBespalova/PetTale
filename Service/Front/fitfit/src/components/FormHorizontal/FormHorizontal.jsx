import React from 'react';
import './FormHorizontal.css';


const FormHorizontal = ({prevParams}) => {

    return (
        <div className="row row-cols-1 row-cols-lg-5 g-3 param-line">
            <div className="col fw-bold">Параметры: </div>
            <div className="col">Грудь: <span className="param-number">{prevParams ? prevParams.chest : 0}</span></div>
            <div className="col">Шея: <span className="param-number">{prevParams ? prevParams.waist : 0}</span></div>
            <div className="col">Спина: <span className="param-number">{prevParams ? prevParams.back : 0}</span></div>
        </div>
    )
}

export default FormHorizontal;


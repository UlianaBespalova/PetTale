import React, {useState} from 'react';
import {validateParamForm} from "../../modules/validations";
import './FormParams.css';


const FormParams = ({updateData}) => {

    const [validateRes, setValidateRes] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let stateChest = '', stateWaist='', stateBack='';
        const inputChest = document.getElementById('inputChest');
        if (inputChest) stateChest = inputChest.value;
        const inputWaist = document.getElementById('inputWaist');
        if (inputWaist) stateWaist = inputWaist.value;
        const inputBack = document.getElementById('inputBack');
        if (inputBack) stateBack = inputBack.value;

        const res = validateParamForm([stateChest, stateWaist, stateBack]);
        setValidateRes(res.msg);
        if (res.msg === '') {
            updateData({
                chest: res.values[0],
                waist: res.values[1],
                back: res.values[2],
            });
        } else {
            updateData (null);
        }
    }


    return (
        <div className="accordion-collapse collapse show" id="formParams" data-bs-parent="#paramsMenu">
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-3">
                    <label htmlFor="inputChest" className="form-label text-small">Обхват груди (см)</label>
                    <input type="text" className="form-control" id="inputChest"/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputWaist" className="form-label text-small">Обхват шеи (см)</label>
                    <input type="text" className="form-control" id="inputWaist"/>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputBack" className="form-label text-small">Длина спины (см)</label>
                    <input type="text" className="form-control" id="inputBack"/>
                </div>
                <div className="text-danger">{validateRes}</div>
                <div className="d-grid gap-2 col-6 mt-4">
                    <button className="btn btn-primary float-start" type="submit">Подобрать размер!</button>
                </div>
            </form>
        </div>
    )
}

export default FormParams;


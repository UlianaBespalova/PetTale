import React, {useState} from 'react';

const data = require('../../data/standardParams.json');

const getParams = (standardParams, breed, sex) => {
    const res = {params: null, msg: ""};

    if (breed === '') {
        res.msg = "Пожалуйста, укажите породу собаки";
        return res;
    }
    if (!standardParams[breed]) {
        res.msg = "К сожалению, у нас нет информации об указанной породе. Вы можете ввести параметры собаки вручную";
        return res;
    }
    if (sex === 'М') res.params = standardParams[breed]['maleParams'];
    else res.params = standardParams[breed]['femaleParams'];
    return res;
}


const updateForm = (params) => {
    const inputWaist = document.getElementById('inputWaist');
    if (inputWaist && params) inputWaist.value = params.waist;
    const inputChest = document.getElementById('inputChest');
    if (inputChest && params) inputChest.value = params.chest;
    const inputBack = document.getElementById('inputBack');
    if (inputBack && params) inputBack.value = params.back;
}

const FormBreed = ({updateData}) => {

    const standardParams = data.standardParams;
    const [params, setParams] = useState(null);
    const [validateRes, setValidateRes] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const stateBreed = event.target.inputBreed.value;
        const stateSex = event.target.inputSex.value;

        const res = getParams(data.standardParams, stateBreed, stateSex);
        setValidateRes(res.msg);
        setParams(res.params);
        updateForm(res.params);
        updateData(res.params);
    }


    return (
        <div className="accordion-collapse collapse" id="formBreed" data-bs-parent="#paramsMenu">
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-5">
                    <label htmlFor="inputBreed" className="form-label text-small">Порода</label>
                    <input id="inputBreed" type="text" list="inputBreedList" className="form-select" />
                    <datalist id="inputBreedList">
                        {
                            Object.keys(standardParams).map((breed) =>
                                <option value={breed}>{breed}</option> )
                        }
                    </datalist>
                </div>
                <div className="col-md-2">
                    <label htmlFor="inputSex" className="form-label text-small">Пол</label>
                    <select id="inputSex" className="form-select">
                        <option>М</option>
                        <option>Ж</option>
                    </select>
                </div>
                <div className="text-danger">{validateRes}</div>
                { params !== null ?  <div className="my-0">Стандартные показатели для выборанной породы:
                    обхват груди - <span className="text-primary"> {params.chest} </span>см,
                    обхват талии - <span className="text-primary"> {params.waist} </span>см,
                    длина спины - <span className="text-primary"> {params.back} </span>см.
                </div> : null}
                <div className="d-grid gap-2 col-6 mt-4">
                    <button className="btn btn-primary float-start" type="submit">Подобрать размер!</button>
                </div>
            </form>
        </div>
    )
}

export default FormBreed;


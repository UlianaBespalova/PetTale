import React from 'react';


const InfoArea = ({sizeValue}) => {

    return (
        <div className="col-lg-10 my-4 my-lg-0">
            Наиболее подходящий размер для вашего пёселя - <span className="text-danger"> {sizeValue} </span>.
        </div>
    )
}

export default InfoArea;


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import FitFit from './FitFit';


export const fitfit = (ClothesType, itemImg, sizes, itemList) => {
    ReactDOM.render(
        <React.StrictMode>
            <FitFit ClothesType={ClothesType} itemImg={itemImg} sizes={sizes} itemList={itemList}/>
        </React.StrictMode>,
        document.getElementById('fitfit')
    );
}

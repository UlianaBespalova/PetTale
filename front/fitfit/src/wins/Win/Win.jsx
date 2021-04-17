import React, {useState} from 'react';
import MainWin from "../MainWin";
import ModelWin from "../ModelWin";
import logo from "./logo.svg";

const Win = ({clothesType, itemList, sizes, itemImg}) => {

    const [params, setParams] = useState([]);
    const updateParams = (newParams) => {
        setParams(newParams);
    }

    return (
        <div>
            <button type="button" className="btn btn-main py-2 px-2" data-bs-toggle="modal"
                    data-bs-target="#mainWin">
                <img src={logo} width="50px" style={{marginLeft: "-10%"}} alt=""/>
            </button>
            <MainWin updateParams={updateParams} clothesType={clothesType}
                     itemList={itemList} sizes={sizes} itemImg={itemImg}/>
            <ModelWin params={params} clothesType={clothesType} sizes={sizes}/>
        </div>
    )
}

export default Win;


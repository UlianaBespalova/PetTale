import React, {useState} from 'react';
import MainWin from "../MainWin";
import ModelWin from "../ModelWin";
import logo from "./logo.svg";
import axios from "axios";
import {urls} from "../../../../api/urls";

const Get_Fitfit_ItemList = (itemId, setFitfitSimilarList, setFitfitRecomsList, setUser) => {

    let userId = parseInt(window.localStorage.getItem('user_id'));
    setUser(userId);

    axios.get(urls.getSimilar(itemId))
        .then((res) => {
            setFitfitSimilarList(res.data);
        })
        .catch(() => {
            console.log('error404');
        });

    axios.get(urls.getRecoms(itemId, userId))
        .then((res) => {
            if (res.data.res !== "Error") {
                setFitfitRecomsList(res.data);
            }
        })
        .catch(() => {
            console.log('error404');
        });
}


const Win = ({clothesType, sizes, itemImg, userId, itemId}) => {

    const [fitfitSimilarList, setFitfitSimilarList] = useState([]);
    const [fitfitRecomsList, setFitfitRecomsList] = useState([]);
    const [user, setUser] = useState(userId);
    const [params, setParams] = useState([]);
    const updateParams = (newParams) => {
        setParams(newParams);
    }

    return (
        <div>
            <button type="button" className="btn btn-main py-2 px-2" data-bs-toggle="modal"
                    data-bs-target="#mainWin"
                    onClick={()=>{Get_Fitfit_ItemList(itemId, setFitfitSimilarList, setFitfitRecomsList, setUser);
                    }}>
                <img src={logo} width="50px" style={{marginLeft: "-10%"}} alt=""/>
            </button>
            <MainWin updateParams={updateParams} clothesType={clothesType} fitfitRecomsList={fitfitRecomsList}
                     fitfitSimilarList={fitfitSimilarList} sizes={sizes} itemImg={itemImg} userId={user}/>
            <ModelWin params={params} clothesType={clothesType} sizes={sizes}/>
        </div>
    )
}

export default Win;


import React, {useState} from 'react';
import FitFit from "../../fitfit/src/FitFit";
import './ItemMainInfo.css';
import axios from "axios";
import {urls} from "../../api/urls";

const SizeListItem = ({value}) => {
    return (
        <button type="button" className="btn btn-sm btn-outline-danger my-1 mx-1">{value}</button>
    )
}

const addToCart = (itemId, userId, setCartInfo) => {
    let userLogin = window.localStorage.getItem('user_login');
    if (userLogin === null || userLogin === "") {
        setCartInfo("Пожалуйста, войдите или зарегистрируйтесь");
        return;
    }

    axios.get(urls.buy(userLogin, itemId))
        .then((res) => {
            if (res.data.res === "Error") {
                switch (res.data.body) {
                    case "No login":
                        setCartInfo("Пожалуйста, войдите или зарегистрируйтесь");
                        break;
                    case "User Error":
                        setCartInfo("Пользователь не найден");
                        break;
                    default:
                        setCartInfo('Товар не найден');
                }
            } else {
                let boughtsList = "";
                res.data.body.boughts.forEach((b)=>{
                    boughtsList+=String(b)+";";
                })
                window.localStorage.setItem('user_boughts', boughtsList);
                setCartInfo("Товар добавлен в корзину");
            }
        })
        .catch(() => {
            console.log('error404');
            setCartInfo('Товар не найден');
        });
    if (userId === -1) {
        setCartInfo("Пожалуйста, войдите или зарегистрируйтесь");
        return;
    }
    setCartInfo("Товар добавлен в корзину");
}

const ItemMainInfo = (props) => {

    const [cartInfo, setCartInfo] = useState("");

    const userBoughts_str = window.localStorage.getItem('user_boughts');
    let userId = window.localStorage.getItem('user_id');
    if (userId === null) userId = -1;
    else userId=parseInt(userId);

    if (userBoughts_str !== null && userBoughts_str !== "") {
        const ub_arr = userBoughts_str.split(';');
        const res = ub_arr.findIndex(item => item === String(props.id))
        if (res !== -1 && cartInfo==="") {
            setCartInfo("Вы уже покупали данный товар");
        }
    }

    return (
        <div className="container h-100 px-4 position-relative">
            <h2 className="text-black fw-bold pt-5 pt-sm-0"><span>{props.price}</span> ₽</h2>
            <div className="my-4">
                <p className="my-1">Цвет: <span>{props.color}</span></p>
                <p className="my-1">Производитель: <span>{props.brand}</span></p>
            </div>
            <div className="mb-5 mb-sm-0">
                <p className="my-1">Выбор размера</p>
                <div className="size-list my-1">
                    {props.sizes.map((item) =>
                        <SizeListItem value={item[1]}/>
                    )}
                </div>
                <div className="fitfit-button mt-3">
                    <FitFit
                        ClothesType={props.fitfitData.ClothesType}
                        itemImg={`https://${props.fitfitData.itemImg}`}
                        sizes={props.fitfitData.sizes}
                        itemId={props.id}
                        userId={userId}
                    />
                </div>
            </div>

            <div className="position-absolute bottom-0 start-2 d-grid gap-2 col-4">
                <button className="btn bg-bright text-light" type="button"
                        onClick={()=>addToCart(props.id, userId, setCartInfo)}>
                    В корзину</button>
                <span className="text-bright fw-bold text-small">
                    {cartInfo}
                </span>
            </div>
        </div>
    )
}

export default ItemMainInfo;


import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import PageTitle from "../../components/PageTitle";
import Footer from "../../components/Footer";
import ItemIllustrate from "../../components/ItemIllustrate";
import ItemMainInfo from "../../components/ItemMainInfo";
import ItemInfo from "../../components/ItemInfo";
import axios from "axios";
import {urls} from "../../api/urls";


const getItemInfo = (responce) => {
    const itemInfo = []
    if (responce.type !== "") itemInfo.push(["Комплектация", responce.type]);
    if (responce.sex !== "") itemInfo.push(["Пол животного", responce.sex]);
    if (responce.size !== "") itemInfo.push(["Размер животного", responce.size]);
    if (responce.color !== "") itemInfo.push(["Цвет", responce.color]);
    if (responce.brand !== "") itemInfo.push(["Производитель", responce.brand]);
    if (responce.country !== "") itemInfo.push(["Страна", responce.country]);
    return itemInfo;
}

const getSizeArray = (responce) => {
    const sizeArray = [];
    responce.sizearray.split(';').forEach((item) => {
        sizeArray.push(item.split(','));
    })
    sizeArray.pop();
    return sizeArray;
}



const ItemPage = () => {

    const history = useHistory();
    const [item, setItem] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [itemInfo, setItemInfo] = useState([]);
    const [sizeArray, setSizeArray] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const id = window.location.href.split('catalog/')[1];

        axios
            .get(urls.item(id))
            .then((res) => {
                setItem(res.data[0].fields);
                setIsLoading(false);
                setItemInfo(getItemInfo(res.data[0].fields));
                setSizeArray(getSizeArray(res.data[0].fields));
            })
            .catch(() => {
                //setIsLoading(false);
                window.location.href = `http://localhost:3000/404`;
                console.log('erro404r');
            });
    }, []);



    return (
        <div>
            <Navbar />
            <div className="container-lg bg-white rounded my-1 py-3 px-4 min-vh-100 text-main">
                {!isLoading ? (<>
                    <button type="button" className="btn btn-outline-danger btn-sm"
                            onClick={() => history.goBack()}>Назад</button>
                    <div className="mt-4">
                        <PageTitle pageTitle={item.title}/>
                    </div>
                    <div className="row my-3">
                        <ItemIllustrate image={item.image}/>
                        <div className="col-sm-7">
                            <ItemMainInfo price={item.price}
                                          brand={item.brand}
                                          color={item.color} sizes={sizeArray}/>
                        </div>
                    </div>
                    <div className="my-5">
                        <h5 className="fw-bold mx-1">Информация о товаре</h5>
                        <ItemInfo itemInfo={itemInfo} />
                </div> < />) : null }
            </div>
            <Footer />
        </div>
    )
}

export default ItemPage;


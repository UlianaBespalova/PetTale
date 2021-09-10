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
import Spinner from "../../components/Spinner";
import {mockResponse} from "../ListPage/ListPage";


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
    const [itemID, setItemID] = useState();

    useEffect(() => {
        setIsLoading(true);
        const id = window.location.href.split('catalog/')[1];

        axios.get(urls.item(id))
            .then((res) => {
                if (res.data.res === "Error") {
                    switch (res.data.body) {
                        case "No item":
                            window.location.href = `http://localhost:8000/404`;
                            break;
                        default:
                            window.location.href = `http://localhost:8000/404`;
                    }
                } else {
                    setItem(res.data[0].fields);
                    setIsLoading(false);
                    setItemInfo(getItemInfo(res.data[0].fields));
                    setSizeArray(getSizeArray(res.data[0].fields));
                    setItemID(res.data[0].pk);
                }
            })
            .catch(() => {
                setIsLoading(false);
                window.location.href = `http://localhost:8000/404`;
                console.log('erro404');
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
                        <div className="col-sm-7 mt-1">
                            <ItemMainInfo price={item.price}
                                          brand={item.brand}
                                          color={item.color} sizes={sizeArray}
                                          id={itemID}
                                          fitfitData = {{
                                              ClothesType: item.type,
                                              itemImg: item.image,
                                              sizes: {sizes: item.sizearray, titles: item.sizeparams},
                                          }} />
                        </div>
                    </div>
                    <div className="my-5">
                        <h5 className="fw-bold mx-1">Информация о товаре</h5>
                        <ItemInfo itemInfo={itemInfo} />
                </div> < />) : <Spinner /> }
            </div>
            <Footer />
        </div>
    )
}

export default ItemPage;


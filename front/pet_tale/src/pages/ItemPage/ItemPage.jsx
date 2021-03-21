import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import PageTitle from "../../components/PageTitle";
import Footer from "../../components/Footer";
import ItemIllustrate from "../../components/ItemIllustrate";
import ItemMainInfo from "../../components/ItemMainInfo";
import ItemInfo from "../../components/ItemInfo";

const mockResponse = {
    body: {
        "id": 7,
        "title": "COLLAR / Курточка двусторонняя AiryVest UNI, размер M 43, розово-черная",
        "brand": "COLLAR",
        "type": "жилет",
        "sex": "самка",
        "size": "для крупных пород; для средних пород",
        "sizeparams": "Российский размер;Размер производителя;Обхват груди, в см;Обхват шеи, в см;Длина спины, в см;",
        "sizearray": "40-43,M43,50-60,36-42,40-43;140-143,1M43,150-160,136-142,140-143;",
        "color": "розовый, черный",
        "country": "Украина",
        "price": 4465,
        "image": "images.wbstatic.net/c516x688/new/13430000/13439876-1.jpg"
    }
}

const ItemPage = () => {

    const itemInfo = []
    if (mockResponse.body.type !== "") itemInfo.push(["Комплектация", mockResponse.body.type]);
    if (mockResponse.body.sex !== "") itemInfo.push(["Пол животного", mockResponse.body.sex]);
    if (mockResponse.body.size !== "") itemInfo.push(["Размер животного", mockResponse.body.size]);
    if (mockResponse.body.color !== "") itemInfo.push(["Цвет", mockResponse.body.color]);
    if (mockResponse.body.brand !== "") itemInfo.push(["Производитель", mockResponse.body.brand]);
    if (mockResponse.body.country !== "") itemInfo.push(["Страна", mockResponse.body.country]);

    const sizeArray = [];
    mockResponse.body.sizearray.split(';').forEach((item) => {
        sizeArray.push(item.split(','));
    })
    sizeArray.pop();

    return (
        <div>
            <Navbar />
            <div className="container-lg bg-light rounded my-1 py-3 px-4 min-vh-100">
                <button type="button" className="btn btn-outline-danger btn-sm">Назад</button>
                <div className="mt-4">
                    <PageTitle pageTitle="Комбезик для такс супермодный"/>
                </div>
                <div className="row my-3">
                    <ItemIllustrate image={mockResponse.body.image}/>
                    <div className="col-sm-7">
                        <ItemMainInfo price={mockResponse.body.price}
                                      brand={mockResponse.body.brand}
                                      color={mockResponse.body.color} sizes={sizeArray}/>
                    </div>
                </div>
                <div className="my-5">
                    <h5 className="fw-bold mx-1">Информация о товаре</h5>
                    <ItemInfo itemInfo={itemInfo} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ItemPage;


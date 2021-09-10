import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Navbar from '../../components/Navbar';
import PageTitle from "../../components/PageTitle";
import LeftMenu from "../../components/LeftMenu";
import HorizontalMenu from "../../components/HorizontalMenu";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import routes from "../../modules/routes";
import {getItemList} from "../../api/api";
import axios from "axios";
import * as url from "url";
import {urls} from "../../api/urls";
import Spinner from "../../components/Spinner";

export const mockResponse = {
    body: [
        {
            pk: 1,
            fields: {"title": "bananadog / Дождевик для животных/ дождевик для собак",
            "price": 2500,
            "image": "images.wbstatic.net/c516x688/new/17670000/17674806-1.jpg"}
        },
        {
            pk: 2,
            fields: {"title": "Arnydog / Куртка для собак Arnydog \"Classic motor\" красная",
            "price": 1236,
            "image": "images.wbstatic.net/c516x688/new/15800000/15809423-1.jpg"}
        },
        {
            pk : 3,
            fields: {"title": "ForMyDogs / Дождевик для собак Такса девочек",
            "price": 3429,
            "image": "images.wbstatic.net/c516x688/new/10540000/10548357-1.jpg"}
        },
        {
            pk : 4,
            fields: {"title": "РўРЈР—Р?Рљ / РњРµРјР±СЂР°РЅР° РЅР° С„Р»РёСЃРµ РґР»СЏ РєРѕР±РµР»СЏ РўР°РєСЃР° СЃСЂРµРґРЅСЏСЏ",
            "price": 3900,
            "image": "images.wbstatic.net/c516x688/new/17570000/17578999-1.jpg"}
        },
        {
            pk : 5,
            fields: {"title": "Mellingward / Комбинезон для собак демисезонный с отверстием для поводка",
            "price": 2750,
            "image": "images.wbstatic.net/c516x688/new/17020000/17023586-1.jpg"}
        },
        {
            pk : 6,
            fields: {"title": "Mellingward / Комбинезон для собак с кармашком, на флисе",
            "price": 3425,
            "image": "images.wbstatic.net/c516x688/new/17020000/17023574-1.jpg"}
        },
        {
            pk : 7,
            fields: {"title": "COLLAR / Курточка двусторонняя AiryVest UNI, размер M 43, розово-черная",
            "price": 4465,
            "image": "images.wbstatic.net/c516x688/new/13430000/13439876-1.jpg"}
        },
        {
            pk : 8,
            fields: {"title": "РўРЈР—Р?Рљ / РњРµРјР±СЂР°РЅР° РЅР° С„Р»РёСЃРµ РґР»СЏ СЃР°РјРєРё Р¦РІРµСЂРіС€РЅР°СѓС†РµСЂ",
            "price": 3900,
            "image": "images.wbstatic.net/c516x688/new/17570000/17579007-1.jpg"}
        },
        {
            pk : 9,
            fields: {"title": "ДжекиДог / Толстовка Флисовая",
            "price": 1490,
            "image": "images.wbstatic.net/c516x688/new/14480000/14484552-1.jpg"}
        }
    ]
}



const ListPage = ({sortParam, sizeParam, offsetParam}) => {

    const [itemList, setItemList] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(urls.itemList([['sort', sortParam], ['size', sizeParam], ['offset', offsetParam]]))
            .then((res) => {
                // console.log('res', res.data);
                setItemList(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                console.log('error404');
            });
    }, []);


    return (
        <div>
            <Navbar />
            <div className="container-lg bg-white rounded my-1 py-3 px-4 min-vh-100 text-main">
                <div className="mt-1">
                    <PageTitle  pageTitle="Одежда для собак" />
                </div>
                <div className="row my-3">
                    <LeftMenu sizeParam={sizeParam}/>
                    <div className="col-sm-9">
                        <HorizontalMenu sortParam={sortParam}/>
                        <div className="row row-cols-2 row-cols-lg-3">
                            {!isLoading ? (
                                itemList.map((item) =>
                                            // <Link to={routes.itemPage.create(item.id)}>
                                            <div onClick={() => window.location=routes.itemPage.create(item.pk) }>
                                                <ItemCard key={item.pk} title={item.fields.title} price={item.fields.price} image={item.fields.image}/>
                                            </div>
                                        // </Link>
                                    )
                            ) : <Spinner />}
                        </div>
                        <Pagination/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ListPage;


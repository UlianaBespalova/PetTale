import React from 'react';
import Footer from "../../components/Footer";
import Page404 from "./Page404.png"


const ListPage = () => {
    return (
        <div>
            <div className="container mt-5">
                <img style={{width: "70%"}} src={ Page404 } className="rounded mx-auto d-block" alt="Страница не найдена" />
            </div>
            <div className="fixed-bottom">
                <Footer />
            </div>
        </div>
    )
}

export default ListPage;


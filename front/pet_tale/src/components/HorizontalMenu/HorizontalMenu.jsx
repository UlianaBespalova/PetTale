import React from 'react';
import routes from "../../modules/routes";

const HorizontalMenu = ({sortParam}) => {
    return (
        <nav className="nav nav-underline">
            <span className="nav-link">Сортировать по:</span>
            <span onClick={() => window.location=routes.listPage.addParam('sort', 'price')}
                className={sortParam === 'price' ? "text-bright nav-link" : "nav-link clicable-text"}>Цене</span>
            <span onClick={() => window.location=routes.listPage.addParam('sort', 'newly')}
                className={sortParam !== 'price' ? "text-bright nav-link" : "nav-link clicable-text"}>Новизне</span>
        </nav>
    )
}

export default HorizontalMenu;

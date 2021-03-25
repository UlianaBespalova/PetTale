import React from 'react';
import routes from "../../modules/routes";

const LeftMenu = ({sizeParam}) => {

    return (
        <div className="col-sm-3 mt-2">
            <h6 className="fw-bold">Категория</h6>
            <div className="container-fluid ml-2">
                <p onClick={() => window.location=routes.listPage.addParam('size', 'all')}
                      className={sizeParam!=='small'&& sizeParam!=='middle' && sizeParam!=='large'?
                          "my-1 text-bright":"my-1 clicable-text"}>Все</p>
                <p onClick={() => window.location=routes.listPage.addParam('size', 'small')}
                      className={sizeParam==='small'?"my-1 text-bright":"my-1 clicable-text"}>Для мелких</p>
                <p onClick={() => window.location=routes.listPage.addParam('size', 'middle')}
                      className={sizeParam==='middle'?"my-1 text-bright":"my-1 clicable-text"}>Для средних</p>
                <p onClick={() => window.location=routes.listPage.addParam('size', 'large')}
                      className={sizeParam==='large'?"my-1 text-bright":"my-1 clicable-text"}>Для крупных</p>
            </div>
        </div>
    )
}

export default LeftMenu;

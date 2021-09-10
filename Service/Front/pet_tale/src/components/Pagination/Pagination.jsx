import React from 'react';
import './Pagination.css';
import routes from "../../modules/routes";


const Pagination = () => {

    const STEP = 51;

    let page;
    let url = new URL(window.location.href);
    page = parseInt(url.searchParams.get("offset"));
    if (isNaN(page)) {
        page = 0;
    }
    let pageCur = parseInt(page/STEP)+1;

    return (
        <ul className="pagination pagination-sm justify-content-end my-2 clicable">
            <li className= {pageCur > 1 ? "page-item text-main" : "page-item text-main disabled"}>
                <a className="page-link" aria-label="Previous"
                   onClick={() => {
                       if (pageCur > 1)
                           window.location=routes.listPage.addParam('offset', String(page-STEP))
                   }}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            {pageCur > 1 ?
            <li className="page-item text-main">
                <a className="page-link" tabIndex="-1"
                   onClick={() => {
                       if (pageCur > 1)
                           window.location=routes.listPage.addParam('offset', String(page-STEP))
                   }}>{pageCur-1}</a>
            </li> : null}
            <li className="page-item active" aria-current="page">
                <span className="page-link">{pageCur}</span>
            </li>
            <li className="page-item">
                <a className="page-link"
                    onClick={() => window.location=routes.listPage.addParam('offset',
                        String(page+STEP))}>{pageCur+1}</a></li>
            <li className="page-item">
                <a className="page-link" aria-label="Next"
                   onClick={() => window.location=routes.listPage.addParam('offset', String(page+STEP))} >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    )
}

export default Pagination;

import React from 'react';
import './Pagination.css';


const Pagination = ({pagePrev, pageCur, pageNext}) => {
    return (
        <ul className="pagination pagination-sm justify-content-end my-2">
            <li className="page-item text-main">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li className="page-item disabled"><a className="page-link" tabIndex="-1" href="#">{pagePrev}</a></li>
            <li className="page-item active" aria-current="page">
                <span className="page-link">{pageCur}</span>
            </li>
            <li className="page-item"><a className="page-link" href="#">{pageNext}</a></li>
            <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    )
}

export default Pagination;

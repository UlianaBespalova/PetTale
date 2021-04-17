import React from 'react';
import Card from "../Card";
import Pagination from "../Pagination";


const RecommendsTab = ({itemList}) => {

    return (
        <div className="accordion-collapse collapse" id="recommendations" data-bs-parent="#tabs" >
            <div className="card card-body px-4">
                <div className="row row-cols-3">
                    {itemList.map((item) => <Card id={item.id} title={item.title}
                                                   price={item.price} image={item.image} />)}
                </div>
                <Pagination />
            </div>
        </div>
    )
}

export default RecommendsTab;


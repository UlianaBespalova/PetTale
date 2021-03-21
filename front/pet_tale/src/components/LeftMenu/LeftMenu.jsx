import React, { useState, useEffect } from 'react';

const LeftMenu = () => {
    return (
        <div className="col-sm-3 mt-2">
            <h6 className="fw-bold">Категория</h6>
            <div className="container-fluid ml-2">
                <p className="my-1">Все</p>
                <p className="my-1">Для мелких</p>
                <p className="my-1">Для средних</p>
                <p className="my-1">Для крупных</p>
            </div>
        </div>
    )
}

export default LeftMenu;

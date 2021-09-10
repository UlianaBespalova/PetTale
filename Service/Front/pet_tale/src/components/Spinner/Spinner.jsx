import React, { useState, useEffect } from 'react';

const Spinner = () => {

    const [isWaiting, setIsWaiting] = useState(true);

    useEffect(() => {
        setTimeout(()=>{
            setIsWaiting(false);
        }, 1000);
    }, []);


    return (
        <>
        {!isWaiting ? (
        <div className="d-flex justify-content-center container-fluid my-5">
            <div className="spinner-border text-main" role="status">
                <span className="visually-hidden">Загрузка...</span>
            </div>
        </div>) : null}
        </>
    )
}

export default Spinner;

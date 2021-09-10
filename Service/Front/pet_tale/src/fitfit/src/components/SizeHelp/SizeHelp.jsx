import React from 'react';
import scheme from './scheme.png';


const SizeHelp = () => {

    return (
        <>
            <span className="float-end" data-bs-toggle="collapse" href="#help" role="button"
                  aria-expanded="false" aria-controls="help">
                        Как измерить?
            </span>
            <div className="collapse" id="help">
                <img className="float-end" src={scheme}   alt="scheme"/>
            </div>
        </>
    )
}

export default SizeHelp;


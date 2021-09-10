import React from 'react';
import './HelpContent.css';


export const helpClick = (el, winId) => {
    const elem = el.target;
    if (elem.classList.contains('collapsed')) {
        elem.classList.replace('item-inactive', 'item-active');
    }
    else {
        elem.classList.replace('item-active', 'item-inactive');
    }
}


const HelpContent = ({helpText}) => {

    return (
        <div className="help-body mx-3 p-3 mb-5">
            <h5 className="help-title">Справка</h5>
            <div className="help-text mt-3">
                <p>{helpText}</p>
                <p className="mt-2">
                    Чтобы закрыть справку, нажмите на "Помощь" еще раз.
                </p>
            </div>
        </div>
    )
}

export default HelpContent;


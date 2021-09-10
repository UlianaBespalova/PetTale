import React from 'react';
import './HorizontalMenu.css';


const itemClick = () => {
    const elem = document.getElementById("horizontalMenu");
    if (!elem) return;
    [].slice.call(elem.children).forEach((elem) => {
        if (elem.classList.contains("item-active")) elem.className = "item-inactive";
        else if (elem.classList.contains("item-inactive")) elem.className = "item-active";
    });
}


const HorizontalMenu = ({items}) => {

    return (
        <span id="horizontalMenu" className="clickable">
            {items.map((item, index)=>
                <>
                    <span className={index === 0? "item-inactive" : "item-active"} data-bs-toggle="collapse"
                          data-bs-target={`#${item.label}`} aria-expanded="false"
                          aria-controls={`#${item.label}`} onClick={() => itemClick()}> {item.title} </span>
                    {items.length <= index + 1 ? null : <span className="mx-3">•</span>}
                </>
            )}
        </span>
    )
}

export default HorizontalMenu;


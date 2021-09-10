import React from 'react';
import './Tab.css';


const tabClick = (tab) => {
    let elemTab = tab.target;
    if (elemTab.type !== "button") {
        elemTab = tab.target.parentElement;
    }
    const elem = elemTab.parentElement.parentElement;
    const parentId = elem.parentElement.id;
    if (parentId === "") return;

    const leftList = document.getElementById("leftList");
    const rightList = document.getElementById("rightList");

    if (parentId === "leftList") {
        [].slice.call(rightList.children).forEach((elem) => { elem.hidden = true; });
        [].slice.call(leftList.children).forEach((elem) => { elem.hidden = false; });
        [].slice.call(document.getElementsByClassName(elem.className)).forEach((elem) => {
            elem.hidden = !elem.hidden;
        });
    }
    if (parentId === "rightList") {
        if (elemTab.classList.contains("collapsed")) {
            [].slice.call(rightList.children).forEach((elem) => { elem.hidden = false; });
            [].slice.call(leftList.children).forEach((elem) => { elem.hidden = true; });
        } else {
            [].slice.call(rightList.children).forEach((elem) => { elem.hidden = true; });
            [].slice.call(leftList.children).forEach((elem) => { elem.hidden = false; });
            [].slice.call(document.getElementsByClassName(elem.className)).forEach((elem) => {
                elem.hidden = !elem.hidden;
            });
        }
    }
}


const Tab = ({title, label}) => {

    return (
        <div id={`tab-${label}`}>
            <button className="btn gap-2 col-9 btn-sm mb-2 button-tab" type="button"
                    data-bs-toggle="collapse" data-bs-target={`#${label}`} aria-expanded="false"
                    aria-controls={`#${label}`} onClick={(el)=>{tabClick(el)}}>
                <span className="float-start mx-3">{title}</span>
            </button>
        </div>
    )
}

export default Tab;


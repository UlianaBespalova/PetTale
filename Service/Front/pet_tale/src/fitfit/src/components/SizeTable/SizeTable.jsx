import React, {useEffect, useState} from 'react';
import {parseSizes} from "../../modules/getSize";
import './SizeTable.css';
import {colorIndication} from "../../modules/colorIndication";


const minimizeTitle = (titleStr) => {
    return titleStr.replace(/производителя/, 'пр-ля');
}

const chooseRow = (el, sizeArray, titleArray, dogParams, clothesType) => {
    const elem =  el.target.parentElement;
    [].slice.call(document.getElementById("table-sizes-body-true").children).forEach((elem) => {
        elem.classList.remove("table-first")});
    elem.classList.add("table-first");

    colorIndication(dogParams, {sizeArray:sizeArray[elem.id], titleArray}, clothesType);
}


const SizeTable = ({hover, sizes, titles, selected, dogParams, clothesType}) => {

    const [sizeArray, setSizeArray] = useState([]);
    const [titleArray, setTitleArray] = useState([]);

    useEffect(() => {
        setSizeArray(parseSizes(sizes));
        const titlesTmp = minimizeTitle(titles).split(';');
        titlesTmp.pop();
        setTitleArray(titlesTmp);
    }, []);


    return (
        <table className={hover ? "table table-sm table-hover" : "table table-sm"}>
            <thead>
            <tr id='table-title'>
                {titleArray.map((item) => <th scope="col">{item}</th>)}
            </tr>
            </thead>
            <tbody id={`table-sizes-body-${hover}`} className={hover? "clickable" : null}
                   onClick={hover ? (el)=>chooseRow(el, sizeArray, titleArray, dogParams, clothesType) : null}>
            {sizeArray.map((str, index) =>
                <tr id={index} className={(index === selected.first ? "table-first" : index === selected.second ?
                    "table-second" : index === selected.third ? "table-third" : null)
                }>
                    {str.map((elem) => <td>{elem}</td>)}
                </tr> )}
            </tbody>
        </table>
    )
}

export default SizeTable;


import React, {useState, useEffect} from 'react';
import SizeHelp from "../SizeHelp";
import FormParams from "../FormParams";
import FormBreed from "../FormBreed";
import HorizontalMenu from "../HorizontalMenu";
import InfoArea from "../InfoArea";
import SizeTable from "../SizeTable";
import {getClosestSize, parseSizes, validateSize} from "../../modules/getSize";
import {colorIndication} from "../../modules/colorIndication";
import './SizeTab.css';


const updateSelected = (size) => {
    const table = document.getElementById("table-sizes-body-true");
    if (!table || !size) return;
    [].slice.call(table.children).forEach((elem) => {
        elem.classList.remove("table-first");
        if (elem.id === String(size.first)) {elem.classList.add("table-first");}
    });
}

const getSize = (dogParams, size, strSizeArray, strTitleArray, clothesType) => {
    const titlesTmp = strTitleArray.split(';');
    titlesTmp.pop();

    colorIndication(dogParams, {
        sizeArray: parseSizes(strSizeArray)[size.first],
        titleArray: titlesTmp
    }, clothesType);
}


const SizeTab = ({updateParams, clothesType, sizes}) => {

    const [validationRes, setValidationRes] = useState([]);
    const [closestSize, setClosestSize] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [warningMsg, setWarningMsg] = useState(null);

    const [params, setParams] = useState(null);


    const updateData = (params) => {

        setParams(params);

        if (params === null) {
            setClosestSize(null);
            return;
        }
        const msgRes = validateSize(params).split("\n");
        msgRes.pop();
        setValidationRes(msgRes);

        if (msgRes.length === 0) {
            const res = getClosestSize(sizes.sizes, sizes.titles, params);
            setClosestSize(res.size);
            setSelectedSize(res.selected);
            setWarningMsg(res.warningMsg);

            updateParams({'params': params, 'selected': res.selected});
        }
    }


    return (
        <div className="accordion-collapse collapse show" id="size" data-bs-parent="#tabs" >
            <div className="card card-body px-4 accordion" id="paramsMenu">
                <div>
                    <span>
                        <HorizontalMenu items={[{label: "formParams", title: "Параметры"},
                            {label: "formBreed", title: "Порода"}]}/>
                    </span>
                    <SizeHelp />
                </div>
                <div className="mt-3 mb-lg-4" >
                    <FormParams updateData={updateData} prevParams = {params}/>
                    <FormBreed updateData={updateData}/>
                </div>
                <div className="mt-3 mb-5 mt-lg-4 mb-lg-4 row">
                    {validationRes.length > 0 ?
                        <div className="text-danger">
                            {validationRes.map((item) => <p>{item}</p>)}
                        </div> : closestSize !== null ? <>
                            <InfoArea sizeValue={closestSize}/>
                            <div className="d-grid gap-2 col-lg-2">
                                <button className="btn btn-lg btn-outline-primary" type="button" onClick={()=>{
                                    updateSelected(selectedSize);
                                    getSize(params, selectedSize, sizes.sizes, sizes.titles, clothesType)}}
                                        data-bs-toggle="modal" data-bs-target="#Model" data-bs-dismiss="modal">3D
                                </button>
                            </div>
                            <div className="text-danger m-0">{warningMsg}</div>
                        </> : null
                    }
                </div>
                {closestSize !== null && validationRes.length === 0 ? <div className="text-small">
                    <SizeTable sizes = {sizes.sizes} titles = {sizes.titles} selected={selectedSize}/>
                </div> : null}
            </div>
        </div>
    )
}

export default SizeTab;


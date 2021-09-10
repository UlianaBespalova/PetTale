import React from 'react';
import {parseSizes} from "../../modules/getSize";


const getSizeData = (itemList) => {
    const minMaxParams = [];
    itemList.forEach((item)=>{
        const sizes = item.fields.sizearray.split(";");
        const titles = item.fields.sizeparams.split(";");
        sizes.pop();
        titles.pop();

        const chestInd = titles.findIndex((item) => item.indexOf('груд') !== -1);
        const neckInd = titles.findIndex((item) => item.indexOf('шеи') !== -1);
        const backInd = titles.findIndex((item) => item.indexOf('спин') !== -1);

        const paramsMinMax = {
            chest: [], neck: [], back: [], }
        sizes.forEach((sizestr)=>{
            const sizestrArr = sizestr.split(",")
            if (chestInd !== -1) paramsMinMax.chest.push(sizestrArr[chestInd]);
            if (neckInd !== -1) paramsMinMax.neck.push(sizestrArr[neckInd]);
            if (backInd !== -1) paramsMinMax.back.push(sizestrArr[backInd]);
        });
        const result = {
            id: item.pk,
            params: {
                chest: { min: 0, max: 200 },
                neck: { min: 0, max: 200 },
                back: { min: 0, max: 200 },
            }
        };
        for (let key in paramsMinMax) {
            if (paramsMinMax[key].length > 0) {
                const newArr = [];
                paramsMinMax[key].forEach((strr)=>{
                    const strArr = strr.split("-");
                    strArr.forEach((i)=>{
                        newArr.push(parseInt(i));
                    })
                });
                result.params[key].min = Math.min(...newArr)-2;
                result.params[key].max = Math.max(...newArr)+2;
            }
        }
        minMaxParams.push(result);
    });
    return minMaxParams;
}

const SizeFilterSwitch = ({flagId, itemList, updateList, params}) => {

    const sizeData = getSizeData(itemList);
    const handleChange = (event) => {
        const el = event.target;
        if (!el.checked || !sizeData) {
            updateList(itemList); }
        else {
            const newList = []
            for (let i=0; i<itemList.length; i++) {
                const itemMaxMin = sizeData[i];
                if (params.chest >= itemMaxMin.params.chest.min &&
                    params.chest <= itemMaxMin.params.chest.max &&
                    params.waist >= itemMaxMin.params.neck.min &&
                    params.waist <= itemMaxMin.params.neck.max &&
                    params.back >= itemMaxMin.params.back.min &&
                    params.back <= itemMaxMin.params.back.max) {
                    newList.push(itemList[i]);
                }
            }
            updateList(newList);
        }
    }

    return (
        <div className="mx-3">
            <div className="form-check">
                {params===undefined ?
                <input className="form-check-input form-check-input-bg" type="checkbox" value=""
                       disabled
                       id={flagId}
                       onChange={handleChange}/>
                    :
                    <input className="form-check-input form-check-input-bg" type="checkbox" value=""
                           id={flagId}
                           onChange={handleChange}/>}
                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                        Учитывать параметры
                    </label>
                {params===undefined ? <span>&nbsp;&nbsp;(не указаны)</span> : null}
            </div>
        </div>
    )
}

export default SizeFilterSwitch;


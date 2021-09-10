import {countDistance} from "./getSize";
import {updateColor} from "../components/Model/Dog";

const accuracyStandard = {
    chest: {
        less: 1,
        more: 2,
    },
    neck: {
        less: 1,
        more: 2,
    },
    back: {
        less: 1,
        more: 2,
    }
}
const accuracyUpdated = {
    chest: {
        less: 1,
        more: 2,
    },
    neck: {
        less: 1,
        more: 2,
    },
    back: {
        less: 5,
        more: 5,
    }
}

const backImportantClothes = ["комбинезон", "дождевик", "плащ", "попона"];

export const colorIndication = (dogParams, size, clothesType) => {

    const params = getParams(dogParams, size);

    let accuracy = accuracyUpdated;
    if (!clothesType || clothesType==="" ||
        backImportantClothes.findIndex((item) => item.indexOf(clothesType) !== -1) !== -1)
        accuracy = accuracyStandard;

    for (let key in params) {
        let color = 'colorOk';
        const distance = countDistance(params[key].dogSize, params[key].tableSize);
        if (distance < 0) {
            if (Math.abs(distance) > accuracy[key].less) color = 'colorBad';
        }
        if (distance > 0) {
            if (distance > accuracy[key].more) color = 'colorWarning';
        }
        updateColor(key, color);
    }
}


const getParams = (dogParams, size) => {
    const params = {};

    let index = size.titleArray.findIndex((item) => item.indexOf('груд') !== -1);
    if (index !== -1) {
        params.chest = {
            tableSize: size.sizeArray[index],
            dogSize: dogParams.chest,
        }
    }
    index = size.titleArray.findIndex((item) => item.indexOf('шеи') !== -1);
    if (index !== -1) {
        params.neck = {
            tableSize: size.sizeArray[index],
            dogSize: dogParams.waist,
        }
    }
    index = size.titleArray.findIndex((item) => item.indexOf('спин') !== -1);
    if (index !== -1) {
        params.back = {
            tableSize: size.sizeArray[index],
            dogSize: dogParams.back,
        }
    }
    return params
}

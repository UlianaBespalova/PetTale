
export const validateSize = ({chest, waist, back}) => {

    let resMsg = '';
    if (chest < 10) {
        resMsg += 'Указанный обхват груди слишком мал, мы уверены, что таких собак не существует. Пожалуйста, проверьте введенное значение.\n';
    }
    if (chest > 70) {
        resMsg += 'Указанный обхват груди слишком велик, мы уверены, что таких собак не существует. Пожалуйста, проверьте введенное значение.\n';
    }
    if (waist < 7) {
        resMsg += 'Указанный обхват шеи слишком мал, мы уверены, что таких собак не существует. Пожалуйста, проверьте введенное значение.\n';
    }
    if (waist > 70) {
        resMsg += 'Указанный обхват шеи слишком велик, мы уверены, что таких собак не существует. Пожалуйста, проверьте введенное значение.\n';
    }
    if (back < 10) {
        resMsg += 'Указанная длина спины слишком мала, мы уверены, что таких собак не существует. Пожалуйста, проверьте введенное значение.\n';
    }
    if (back > 100) {
        resMsg += 'Указанная длина спины слишком велика, мы уверены, что таких собак не существует. Пожалуйста, проверьте введенное значение.\n';
    }
    return resMsg;
}

export const parseSizes = (sizeStr) => {
    const sizeArray = [];
    sizeStr.split(";").forEach((str) => {
        sizeArray.push(str.split(","));
    })
    sizeArray.pop();
    return sizeArray;
}


export const getClosestSize = (strSizeArray, strTitleArray, params) => {

    const sizeArray = parseSizes(strSizeArray);
    const titleArray = strTitleArray.split(';');
    titleArray.pop();

    const paramItems = [];
    paramItems.push({index: titleArray.findIndex((item) => item.indexOf('груд') !== -1), param: params.chest});
    paramItems.push({index: titleArray.findIndex((item) => item.indexOf('шеи') !== -1), param: params.waist});
    paramItems.push({index: titleArray.findIndex((item) => item.indexOf('спин') !== -1), param: params.back});


    const metricL1 = [];
    sizeArray.forEach((sizeItem, ind) => {
            let L1 = 0;
            paramItems.forEach((param) => {
                if (param.index === -1) return;
                L1 += Math.abs(countDistance(param.param, sizeItem[param.index]));
            });
            metricL1.push({metric: L1, index: ind});
        }
    )
    metricL1.sort((prev, next) => prev.metric - next.metric);

    return {
        size: sizeArray[metricL1[0].index][1],
        selected: {
            first: metricL1[0].index,
            second: metricL1[1].index,
            third: metricL1[2].index,
        },
        warningMsg: metricL1[0].metric < 15 ? null : "Разница между ближайшим размером и параметрами вашей собаки слишком велика. Возможно, вам стоит выбрать другой товар.",
    }
}


export const countDistance = (point, value) => {

    if (value.indexOf('-') === -1) {
        const valueNum = Number(value);
        if (!isNaN(valueNum)) {
            return valueNum-point;
        } else return 0;
    }
    const rangeNum = [];
    value.split('-').forEach((val) => {
        const valueNum = Number(val);
        if (!isNaN(valueNum)) {
            rangeNum.push(valueNum);
        }
    });
    if (rangeNum.length !== 2) return 0;
    if (point >= rangeNum[0] && point <= rangeNum[1]) return 0;

    if (Math.abs(point-rangeNum[0]) < Math.abs(point-rangeNum[1]))
        return rangeNum[0]-point;
    else return rangeNum[1]-point;
}


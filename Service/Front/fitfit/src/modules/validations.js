export const validateParamForm = (values) => {
    const res = {values: [], msg: ""};
    values.forEach((value) => {
        if (value === "") {
            res.msg = "Пожалуйста, введите значение";
            return;
        }
        const num = Number(value);
        if (!Number.isInteger(num) || num <=0) {
            res.msg = "Пожалуйста, введите положительное число";
            return;
        }
        res.values.push(num);
    })
    return res;
}

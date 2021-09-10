export const HOST = 'http://127.0.0.1:8000';

export const urls = {
    base: HOST,
    itemList : (params) => {
        let url = new URL(`${HOST}/api/v0/itemlist`);
        params.forEach((param) => {url.searchParams.set(param[0], param[1]);})
        return url;
    },
    item : (itemID) => `${HOST}/api/v0/item/${itemID}`,

    login : (login, psw) => `${HOST}/api/v0/login?login=${login}&psw=${psw}`,
    register : (login, email, psw) => `${HOST}/api/v0/register?login=${login}&email=${email}&psw=${psw}`,

    buy : (login, item_id) => `${HOST}/api/v0/buy?login=${login}&item=${item_id}`,

    getSimilar : (item_id) => `${HOST}/api/v0/fitfit/similar?item=${item_id}`,
    getRecoms : (item_id, user_id) => `${HOST}/api/v0/fitfit/recommendations?item=${item_id}&user=${user_id}`,
}

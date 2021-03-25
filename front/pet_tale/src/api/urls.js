export const HOST = 'http://127.0.0.1:8003';

export const urls = {
    base: HOST,
    itemList : (params) => {
        let url = new URL(`${HOST}/api/v0/itemlist`);
        params.forEach((param) => {url.searchParams.set(param[0], param[1]);})
        return url;
    },
    item : (itemID) => `${HOST}/api/v0/item/${itemID}`,
}

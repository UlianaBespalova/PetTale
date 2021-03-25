import axios from "axios";
import {urls} from "./urls";


export const getItemList = (params) =>{
    return axios.get(urls.itemList(params)).then((res)=>res.data);
}

export const getItem = (itemId) =>{
    return axios.get(urls.item(itemId)).then((res)=>res.data);
}

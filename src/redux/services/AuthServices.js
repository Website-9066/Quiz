import { GET_DATA_API } from "../config/apiEndPoints";
import { baseApiCall } from "../config/BaseApiCall";



export const getdataApi = () => {
    return baseApiCall({
        url: GET_DATA_API,
        method: "get"
    });

}
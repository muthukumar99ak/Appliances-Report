import { ALL_APPLIANCES, APPLIANCES_INFO, BASE_URL } from "../apiConstants/apiUrls";

const getDeviceReportList = (queryString) => {
    let url = `${BASE_URL}${ALL_APPLIANCES}`;
    if (queryString) {
        url += `?${queryString}`;
    }
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                reject('Failed to fetch data');
            }
            const responseJson = await response.json();
            resolve(responseJson);
        } catch (e) {
            reject('Failed to fetch data');
        }
    })
}

const getDeviceInfo = (deviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = BASE_URL;
            url += APPLIANCES_INFO.replace("{deviceId}", deviceId);
            const response = await fetch(url);
            
            // Resolve empty data on 404 to render empty view
            if (response.status === 404) {
                resolve();
            } else if (!response.ok) {
                reject('Failed to fetch data');
            }

            const responseJson = await response.json();
            resolve(responseJson);
        } catch (e) {
            reject('Failed to fetch data');
        }
    })
}

export {
    getDeviceReportList,
    getDeviceInfo
}
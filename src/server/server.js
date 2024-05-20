import allAppliances from './mockData/appliances.json';
import appliancesInfo from './mockData/appliancesInfo.json';


const getDownloadStatusCount = (deviceReports) => {
    const groupedReports = Object.groupBy(deviceReports, report => report.downloadStatus);
    const countByDownloadStatus = Object.keys(groupedReports).reduce((acc, cur) => {
        acc[cur] = groupedReports[cur].length;
        return acc;
    }, {});
    return countByDownloadStatus;
}

const getAppliancesList = (params) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const {
                offset = 0,
                fetchCount = 10,
                searchString,
                deviceStatus,
                downloadStatus
            } = params;

            let filteredAppliances = allAppliances;
            const downloadStatusCount = getDownloadStatusCount(filteredAppliances);

            if (deviceStatus) {
                filteredAppliances = filteredAppliances.filter(appliance => appliance.deviceStatus.toLowerCase() === deviceStatus.toLowerCase());
            }

            if (downloadStatus) {
                filteredAppliances = filteredAppliances.filter(appliance => appliance.downloadStatus.toLowerCase() === downloadStatus.toLowerCase());
            }

            if (searchString) {
                filteredAppliances = filteredAppliances.filter(appliance => appliance.serialNo.includes(searchString));
            }

            const totalCount = filteredAppliances.length;

            // Sort the filtered list by serialNo
            const sortedAppliances = filteredAppliances.sort((a, b) => a.serialNo.localeCompare(b.serialNo));

            // Paginate the sorted list
            const paginatedAppliances = sortedAppliances.slice(offset, offset + fetchCount);

            resolve({
                appliances: paginatedAppliances,
                downloadStatusCount: downloadStatusCount,
                totalCount
            });
        }, 200);
    })
}

const getApplianceInfo = (applianceId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const applianceInfo = appliancesInfo.find(appliance => appliance.serialNo?.toLowerCase() === applianceId?.toLowerCase());
            if (applianceInfo) {
                resolve(applianceInfo);
            } else {
                reject({
                    type: 404,
                    httpCode: "404 Not Found",
                    requestId: applianceId,
                    error: {
                        code: "APPLIANCE_NOT_FOUND",
                        message: "Appliance not found"
                    }
                })
            }
        }, 200);
    })
}

export {
    getAppliancesList,
    getApplianceInfo
}
// React Router
import { Link } from "react-router-dom";
// Components
import Badge from "../components/badge/Badge";
import DeviceLocation from "../components/deviceLocation/DeviceLocation";
// Constants
import INPUT_TYPES from "../constants/inputTypes";
import DOWNLOAD_STATUS from "../constants/downloadStatus";
import BADGE_TYPES from "../constants/badgeTypes";
import DEVICE_STATUS from "../constants/deviceStatus";


const getBadgeTypeByStatus = (status) => {
    const statusLowerCase = status.toLowerCase();
    const { RED, BLUE, GREEN, YELLOW } = BADGE_TYPES;
    const downloadStatusBadgeTypes = {
        failed: RED,
        cancelled: YELLOW,
        downloading: BLUE,
        succeeded: GREEN
    }
    const deviceStatusBadgeTypes = {
        online: GREEN,
        offline: RED
    }
    return downloadStatusBadgeTypes[statusLowerCase] || deviceStatusBadgeTypes[statusLowerCase] || "";
}

const renderBandwidth = (row) => {
    const { bandwidth, avgBandwidth } = row;
    return (
        <div className="bandwidth-container">
            <div className="bandwidth">{bandwidth}</div>
            <div className="avg-bandwidth">{avgBandwidth}</div>
        </div>
    )
}

const renderStatus = (status) => {
    const badgeType = getBadgeTypeByStatus(status);
    return <Badge ctrCls="device-status" label={status} badgeType={badgeType} />
}

const DEVICE_REPORT_LIST_COLUMNS = [
    {
        key: "serialNo",
        title: "Device Serial"
    },
    {
        key: "location",
        title: "Location",
        onRenderer: (row) => <DeviceLocation deviceInfo={row} />
    },
    {
        key: "bandwidth",
        title: "Bandwidth",
        onRenderer: renderBandwidth
    },
    {
        key: "deviceStatus",
        title: "Status",
        onRenderer: ({ deviceStatus = "" }) => renderStatus(deviceStatus)
    },
    {
        key: "downloadStatus",
        title: "Download Status",
        onRenderer: ({ downloadStatus = "" }) => renderStatus(downloadStatus)
    },
    {
        key: "osVersion",
        title: "OS Version",
    },
    {
        key: "viewButton",
        title: "",
        onRenderer: (row) => (<Link className="custom-button text-decoration-none" to={`/${row.serialNo}`}>View</Link>)
    }
];

const DEVICE_REPORT_FILTERS = [{
    key: "deviceStatus",
    type: INPUT_TYPES.SELECT,
    label: "Device status",
    options: [
        { label: "Online", value: DEVICE_STATUS.ONLINE },
        { label: "Offline", value: DEVICE_STATUS.OFFLINE }
    ]
},
{
    key: "downloadStatus",
    type: INPUT_TYPES.SELECT,
    label: "Download status",
    options: [
        { label: "Failed", value: DOWNLOAD_STATUS.FAILED },
        { label: "Cancelled", value: DOWNLOAD_STATUS.CANCELLED },
        { label: "Downloading", value: DOWNLOAD_STATUS.DOWNLOADING },
        { label: "Succeeded", value: DOWNLOAD_STATUS.SUCCEEDED }
    ]
}];

// Export Functions OR Values
export {
    DEVICE_REPORT_LIST_COLUMNS,
    DEVICE_REPORT_FILTERS,
    getBadgeTypeByStatus
}
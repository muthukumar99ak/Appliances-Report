import { Link } from "react-router-dom";
import Badge, { BADGE_TYPES } from "../components/badge/Badge";
import Location from "../components/location/Location";
import INPUT_TYPES from "../constants/inputTypes";


const getBadgeTypeByStatus = (status) => {
    const statusLowerCase = status.toLowerCase();
    const { RED, BLUE, GREEN, YELLOW } = BADGE_TYPES;
    const downloadStatusBadgeTypes = {
        failed: RED,
        scheduled: YELLOW,
        cancelled: YELLOW,
        downloading: BLUE,
        downloaded: GREEN,
        stalled: RED,
        archived: RED,
        unarchiving: BLUE,
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
        onRenderer: (row) => <Location deviceInfo={row} />
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

const getFilterElementsForDeviceReport = (downloadStatusOptions = []) => ([{
    key: "deviceStatus",
    type: INPUT_TYPES.SELECT,
    label: "Device status",
    options: [{
        label: "Online",
        value: "online"
    },{
        label: "Offline",
        value: "Offline"
    }]
},
{
    key: "downloadStatus",
    type: INPUT_TYPES.SELECT,
    label: "Download status",
    options: downloadStatusOptions
}])

// Export Functions OR Values
export {
    DEVICE_REPORT_LIST_COLUMNS,
    getFilterElementsForDeviceReport,
    getBadgeTypeByStatus
}
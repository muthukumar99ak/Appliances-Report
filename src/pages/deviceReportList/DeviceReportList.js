import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import { DEVICE_REPORT_LIST_COLUMNS, getBadgeTypeByStatus, getFilterElementsForDeviceReport } from '../../helper/deviceReportListHelper';
import Badge from '../../components/badge/Badge';
import { useCallback, useEffect, useState } from 'react';
import './DeviceReportList.scss';
import LOADING_STATES from "../../constants/loadingStates";
import Loader from "../../components/loader/Loader";
import EmptyScreen from "../../components/emptyScreen/EmptyScreen";

const {
    FETCHING,
    FETCHED_AND_AVAILABLE,
    FETCHED_BUT_EMPTY,
    ERROR
} = LOADING_STATES;

const DeviceReportList = () => {
    const [deviceReports, setDeviceReports] = useState([]);
    const [countByDownloadStatus, setCountByDownloadStatus] = useState({});
    const [loadingState, setLoadingState] = useState(FETCHING);
    const [error, setError] = useState("");

    const getQueryString = (params = {}) => {
        return Object.keys(params).reduce((acc, cur) => {
            if (typeof params[cur] !== "undefined") {
                acc.push(`${cur}=${params[cur]}`)
            }
            return acc;
        }, []).join('&');
    }

    const getDeviceReports = useCallback(
        async (selectedFilters) => {
            let queryString = getQueryString(selectedFilters);
            try {
                const response = await fetch(`http://localhost:3001/api/v1/appliances?${queryString}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const { appliances = [] } = await response.json();
                const countByDownloadStatus = getDownloadStatusCount(appliances);
                setCountByDownloadStatus(countByDownloadStatus);
                setLoadingState(appliances.length > 0 ? FETCHED_AND_AVAILABLE : FETCHED_BUT_EMPTY);
                setDeviceReports(appliances);
            } catch (e) {
                setError(e.message);
                setLoadingState(ERROR);
            }
        },
        []
    )

    useEffect(() => {
        getDeviceReports();
    }, [
        getDeviceReports
    ]);

    const getDownloadStatusCount = (deviceReports) => {
        const groupedReports = Object.groupBy(deviceReports, report => report.downloadStatus);
        const countByDownloadStatus = Object.keys(groupedReports).reduce((acc, cur) => {
            acc[cur] = groupedReports[cur].length;
            return acc;
        }, {});
        return countByDownloadStatus;
    }

    const renderDownloadStatusBadge = () => {
        return Object.keys(countByDownloadStatus).map((status, index) => {
            const badgeType = getBadgeTypeByStatus(status);
            const count = countByDownloadStatus[status];
            return <Badge
                key={index}
                count={count}
                label={status}
                badgeType={badgeType} />
        })
    }

    const getDownloadStatusOptionsForFilter = () => {
        return Object.keys(countByDownloadStatus).map(status => ({
            label: status,
            value: status.toLowerCase()
        }));
    }

    const renderDeviceReportList = () => {
        const downloadStatusOptions = getDownloadStatusOptionsForFilter();
        return (
            <div className="device-report-list-ctr">
                <div className="device-status-ctr">
                    {renderDownloadStatusBadge()}
                </div>
                <div className="device-report-container">
                    <Table
                        onFilter={(selectedFilters) => getDeviceReports(selectedFilters)}
                        filters={getFilterElementsForDeviceReport(downloadStatusOptions)}
                        rowData={deviceReports}
                        columns={DEVICE_REPORT_LIST_COLUMNS}
                    />
                </div>
            </div>
        )
    }
    
    const renderError = () => {
        return (
            <div className='error-container'>
                <p className='error'>Error</p>
                <p className='center-text'>{error || "Failed to fetch data"}</p>
            </div>
        )
    }

    const renderUiByLoadingState = () => {
        switch (loadingState) {
            case FETCHING:
                return <Loader />;
            case FETCHED_AND_AVAILABLE:
                return renderDeviceReportList();
            case FETCHED_BUT_EMPTY:
                return <EmptyScreen />
            case ERROR:
                return renderError();
        }
    }

    return (
        <div className="app-container">
            <Header />
            {renderUiByLoadingState()}
        </div>
    );
}

export default DeviceReportList;

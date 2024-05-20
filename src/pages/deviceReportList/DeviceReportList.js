// Components
import Header from "../../components/header/Header";
import Table from "../../components/table/Table";
import Badge from '../../components/badge/Badge';
// Helpers
import { DEVICE_REPORT_LIST_COLUMNS, getBadgeTypeByStatus, DEVICE_REPORT_FILTERS } from '../../helpers/deviceReportListHelper';
// Constants
import LOADING_STATES from "../../constants/loadingStates";
// Custom hooks
import useDeviceReportList from '../../customHooks/useDeviceReportList';
// Scss
import './DeviceReportList.scss';

const {
    FETCHED_AND_AVAILABLE,
    ERROR
} = LOADING_STATES;

const DeviceReportList = () => {
    const {
        deviceReports,
        countByDownloadStatus,
        loadingState,
        error,
        totalCount,
        filtersValues, 
        filtersDispatch
    } = useDeviceReportList();

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

    const renderTable = () => {
        return <Table
            rowData={deviceReports}
            rowLength={totalCount}
            loadingState={loadingState}
            columns={DEVICE_REPORT_LIST_COLUMNS}
            advancedfilters={DEVICE_REPORT_FILTERS}
            filtersValues={filtersValues}
            filtersDispatch={filtersDispatch}
        />
    }

    const renderDeviceReportList = () => {
        return (
            <div className="device-report-list-ctr">
                {Object.keys(countByDownloadStatus).length > 0 && (
                    <div className="device-status-ctr">
                        {renderDownloadStatusBadge()}
                    </div>
                )}
                <div className="device-report-container">
                    {renderTable()}
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

    return (
        <div className="app-container">
            <Header />
            {loadingState === ERROR ? renderError() : renderDeviceReportList()}
        </div>
    );
}

export default DeviceReportList;

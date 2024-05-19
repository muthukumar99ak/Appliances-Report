import { useCallback, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { LogIcon, PieIcon, SpeedTestIcon } from '../../assets';
import Button from '../../components/button/Button';
import Badge from '../../components/badge/Badge';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Tab from '../../components/tab/Tab';
import DeviceInfo from '../../components/deviceInfo/DeviceInfo';
import { DEVICE_INFO_COLUMNS } from '../../helper/deviceInfoHelper';
import LOADING_STATES from '../../constants/loadingStates';
import './DeviceReport.scss';
import { getBadgeTypeByStatus } from '../../helper/deviceReportListHelper';
import Location from '../../components/location/Location';
import Loader from '../../components/loader/Loader';
import EmptyScreen from '../../components/emptyScreen/EmptyScreen';

const {
    FETCHING,
    FETCHED_AND_AVAILABLE,
    FETCHED_BUT_EMPTY,
    ERROR
} = LOADING_STATES;

const DeviceReport = () => {
    const { deviceId } = useParams();
    const [deviceInfo, setDeviceInfo] = useState([]);
    const [loadingState, setLoadingState] = useState(FETCHING);
    const [error, setError] = useState("");

    const getDeviceReportById = useCallback(
        async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/v1/appliance/${deviceId}/info`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const deviceReport = await response.json();
                setLoadingState(!!deviceReport ? FETCHED_AND_AVAILABLE : FETCHED_BUT_EMPTY);
                setDeviceInfo(deviceReport);
            } catch (e) {
                setError(e.message);
                setLoadingState(ERROR);
            }
        },
        [deviceId]
    )

    useEffect(() => {
        getDeviceReportById();
    }, [
        getDeviceReportById
    ])

    const getTabDetails = () => {
        return [
            {
                title: 'Details',
                content: renderDeviceInfo()
            },
            {
                title: 'Content',
                content: <div>Content Tab</div>
            },
            {
                title: 'Bandwidth',
                content: <div>Bandwidth Tab</div>
            }
        ]
    }

    const getBreadcrumbsPath = () => {
        return [{
            path: "/",
            label: "Devices",
            active: true
        }, {
            label: deviceId,
            active: false
        }]
    }

    const renderDeviceInfo = () => {
        return <DeviceInfo
            infoColumns={DEVICE_INFO_COLUMNS}
            deviceInfo={deviceInfo}
        />
    }

    const renderDeviceStatus = () => {
        const { deviceStatus, storage } = deviceInfo;
        const badgeType = getBadgeTypeByStatus(deviceStatus);
        return (
            <div className='device-storage-and-status'>
                <Badge label={deviceStatus} badgeType={badgeType} isRounded />
                <Badge label={storage} icon={PieIcon} isRounded />
            </div>
        );
    }

    const renderDeviceIdAndHeaderButtons = () => {
        return (
            <div className='device-id-container'>
                <h4 className='device-id'>{deviceId}</h4>
                <div className='header-buttons'>
                    <Button icon={SpeedTestIcon}>Speedtest</Button>
                    <Button icon={LogIcon}>Logs</Button>
                </div>
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <div className='device-report-header'>
                {renderDeviceIdAndHeaderButtons()}
                <Location deviceInfo={deviceInfo} />
                {renderDeviceStatus()}
            </div>
        )
    }

    const renderTabs = () => {
        const tabDetails = getTabDetails();
        return <Tab
            tabs={tabDetails}
            ctrCls={"device-report-tabs"} />
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
                return (
                    <>
                        {renderHeader()}
                        {renderTabs()}
                    </>
                );
            case FETCHED_BUT_EMPTY:
                return <EmptyScreen message={`No data found for the device serial number ${deviceId}`} />
            case ERROR:
                return renderError();
        }
    }

    return (
        <div className='device-report-ctr'>
            <Breadcrumbs paths={getBreadcrumbsPath()} />
            {renderUiByLoadingState()}
        </div>
    )
}

export default DeviceReport;
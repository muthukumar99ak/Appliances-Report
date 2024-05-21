import { useCallback, useEffect, useState } from "react";
import LOADING_STATES from "../constants/loadingStates";
import useTableFilters from "./useTableFilters";
import { getAppliancesList } from "../server/server";

const {
    FETCHING,
    FETCHED_AND_AVAILABLE,
    FETCHED_BUT_EMPTY,
    ERROR
} = LOADING_STATES;

const useDeviceReportList = () => {
    const [deviceReports, setDeviceReports] = useState([]);
    const [countByDownloadStatus, setCountByDownloadStatus] = useState({});
    const [loadingState, setLoadingState] = useState(FETCHING);
    const [error, setError] = useState("");
    const [totalCount, setTotalCount] = useState(null);
    const [filterControls, filterControlsDispatch] = useTableFilters();
    const {
        currentPage,
        showByValue,
        searchString,
        selectedFilters
    } = filterControls;
    const depFilterString = JSON.stringify(selectedFilters);

    
    const getQueryParams = useCallback(
        () => {
            return {
                offset: (currentPage - 1) * showByValue,
                fetchCount: showByValue,
                searchString: searchString,
                deviceStatus: selectedFilters.deviceStatus,
                downloadStatus: selectedFilters.downloadStatus
            }
        },
        [ 
            currentPage,
            showByValue,
            searchString,
            selectedFilters.deviceStatus,
            selectedFilters.downloadStatus
        ]
    )

    const getDeviceReports = useCallback(
        () => {
            // Get query params string for the API
            const queryParams = getQueryParams();

            setLoadingState(FETCHING);
            // Get all devices reports from API
            getAppliancesList(queryParams)
                .then(response => {
                    const { 
                        appliances = [], 
                        totalCount,
                        downloadStatusCount
                    } = response;
                    setCountByDownloadStatus(downloadStatusCount);
                    setTotalCount(totalCount);
                    setLoadingState(appliances.length > 0 ? FETCHED_AND_AVAILABLE : FETCHED_BUT_EMPTY);
                    setDeviceReports(appliances);
                })
                .catch(error => {
                    setError(error);
                    setLoadingState(ERROR);
                })
        },
        [
            getQueryParams
        ]
    )

    useEffect(() => {
        getDeviceReports();
    }, [
        currentPage,
        showByValue,
        searchString,
        depFilterString,
        getDeviceReports
    ])

    return {
        deviceReports,
        countByDownloadStatus,
        loadingState,
        error,
        totalCount,
        filterControls, 
        filterControlsDispatch
    }
}

export default useDeviceReportList;
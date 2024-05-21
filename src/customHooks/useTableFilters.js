import { useReducer } from "react";
import { filtersInitialState, tableFiltersReducer } from "../components/table/store/reducer/tableFiltersReducer";

const createInitialState = (pageOptions) => {
    const { 
        limit = 10,
        offset = 0 
    } = pageOptions;
    return {
        ...filtersInitialState,
        currentPage: (offset / limit) + 1,
        showByValue: limit
    }
}

const useTableFilters = (pageOptions = {}) => {
    const [globalFilters, globalFiltersDispatch] = useReducer(tableFiltersReducer, pageOptions, createInitialState);
    return [
        globalFilters,
        globalFiltersDispatch
    ]
}

export default useTableFilters;
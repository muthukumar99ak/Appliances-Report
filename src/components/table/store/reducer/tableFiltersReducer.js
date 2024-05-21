import { TABLE_FILTERS_ACTION_TYPES } from "../actions/tableFiltersActionTypes";

export const filtersInitialState = {
    currentPage: 1,
    showByValue: 10,
    searchString: "",
    selectedFilters: {}
}

export const tableFiltersReducer = (state, action) => {
    const { type, payload } = action;
    const {
        SET_PAGE_NUMBER,
        SET_SEARCH_STRING,
        SET_SELECTED_FILTERS,
        SET_SHOW_BY_VALUE,
        RESET_FILTERS
    } = TABLE_FILTERS_ACTION_TYPES;
    
    switch (type) {
        case SET_PAGE_NUMBER:
            return {
                ...state,
                currentPage: payload
            };
        case SET_SHOW_BY_VALUE:
            return {
                ...state,
                currentPage: 1,
                showByValue: payload
            }
        case SET_SEARCH_STRING:
            return {
                ...state,
                currentPage: 1,
                searchString: payload
            }
        case SET_SELECTED_FILTERS:
            return {
                ...state,
                currentPage: 1,
                selectedFilters: payload
            }
        case RESET_FILTERS:
            return filtersInitialState;
        default:
            return state;
    }
}

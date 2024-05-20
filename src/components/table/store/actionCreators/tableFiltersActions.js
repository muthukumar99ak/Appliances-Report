import { TABLE_FILTERS_ACTION_TYPES } from "../actions/tableFiltersActionTypes"


export const setPageNumber = (dispatch, value) => {
    dispatch({
        type: TABLE_FILTERS_ACTION_TYPES.SET_PAGE_NUMBER,
        payload: value
    })
}

export const setSearchString = (dispatch, value) => {
    dispatch({
        type: TABLE_FILTERS_ACTION_TYPES.SET_SEARCH_STRING,
        payload: value
    })
}

export const setSelectedFilters = (dispatch, value) => {
    dispatch({
        type: TABLE_FILTERS_ACTION_TYPES.SET_SELECTED_FILTERS,
        payload: value
    })
}

export const setShowByValue = (dispatch, value) => {
    dispatch({
        type: TABLE_FILTERS_ACTION_TYPES.SET_SHOW_BY_VALUE,
        payload: value
    })
}
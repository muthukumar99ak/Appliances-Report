// Pre-defined
import PropTypes from 'prop-types';
// Components
import TableHeaderControls from './tableHeaderControls/TableHeaderControls';
import EmptyScreen from '../emptyScreen/EmptyScreen';
import Loader from '../loader/Loader';
// Constants
import LOADING_STATES from '../../constants/loadingStates';
// Scss
import './Table.scss';

const {
    FETCHING,
    FETCHED_AND_AVAILABLE,
    FETCHED_BUT_EMPTY,
    ERROR
} = LOADING_STATES;

const Table = ({
    rowData = [],
    rowLength,
    columns = [],
    advancedfilters = [],
    filterControls,
    filterControlsDispatch,
    loadingState = FETCHED_AND_AVAILABLE
}) => {

    const renderTableHeaderColumns = () => {
        return (
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th key={index}>{column.title}</th>
                    )
                })}
            </tr>
        )
    }

    const renderRowColumns = (row) => {
        return columns.map((column, index) => {
            let columnValue = row[column.key];

            // If renderer function provided override colunmValue by its return jsx
            if (typeof column.onRenderer === 'function') {
                columnValue = column.onRenderer(row);
            }

            return (
                <td key={index}>{columnValue || "-"}</td>
            )
        })
    }

    const renderEmptyScreen = () => {
        return (
            <tr>
                <td colSpan={columns.length}>
                    <EmptyScreen />
                </td>
            </tr>
        )
    }

    const renderTableRows = () => {
        return rowData.map((row) => (
            <tr key={row.serialNo}>
                {renderRowColumns(row)}
            </tr>
        ))
    }

    const renderLoader = () => {
        return (
            <tr>
                <td colSpan={columns.length}>
                    <Loader />
                </td>
            </tr>
        )
    }

    const renderTableRowsUiByLoadingState = () => {
        switch (loadingState) {
            case FETCHING:
                return renderLoader();
            case FETCHED_AND_AVAILABLE:
                return renderTableRows();
            default:
                return renderEmptyScreen();
        }
    }

    const renderHeader = () => {
        return <TableHeaderControls
            advancedfilters={advancedfilters}
            rowLength={rowLength}
            filterControls={filterControls}
            filterControlsDispatch={filterControlsDispatch}
        />
    }

    return (
        <div className='table-container'>
            {renderHeader()}
            <div className='table-scroll-container'>
                <table className='table'>
                    <thead className='table-header'>
                        {renderTableHeaderColumns()}
                    </thead>
                    <tbody className='table-body'>
                        {renderTableRowsUiByLoadingState()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Table.propTypes = {
    rowData: PropTypes.array,
    rowLength: PropTypes.number,
    columns: PropTypes.array,
    advancedfilters: PropTypes.array,
    filterControls: PropTypes.object,
    loadingState: PropTypes.oneOf([
        FETCHED_AND_AVAILABLE,
        FETCHED_BUT_EMPTY,
        FETCHING,
        ERROR
    ])
};

export default Table;
// Pre defined
import { useState } from "react";
import PropTypes from 'prop-types';
// Assets
import { FilterIcon } from "../../../assets/images";
// Components
import Button from "../../button/Button";
import Pagination from "../../pagination/Pagination";
import SearchInput from "../../searchInput/SearchInput";
import TableFilter from "../tableFilter/TableFilter";
// Actions
import { setPageNumber, setSearchString, setSelectedFilters, setShowByValue } from "../store/actionCreators/tableFiltersActions";

const TableHeaderControls = ({
    advancedfilters,
    rowLength,
    filtersValues,
    filtersDispatch
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {
        pageNumber,
        showByValue,
        selectedFilters
    } = filtersValues;

    const onPageSizeChange = (size) => {
        setShowByValue(filtersDispatch, size);
    }

    const onPageChange = (pageNumber) => {
        setPageNumber(filtersDispatch, pageNumber);
    }

    const onSearchFilter = (selectedValues) => {
        setIsFilterOpen(false);
        setSelectedFilters(filtersDispatch, selectedValues);
    }

    const renderTableFilter = () => {
        return (
            <TableFilter
                selectedFilters={selectedFilters}
                inputList={advancedfilters}
                onSearch={onSearchFilter}
                onCancel={() => setIsFilterOpen(false)}
            />
        )
    }

    const renderPageControl = () => {
        return (
            <Pagination
                pageNumber={pageNumber}
                rowLength={rowLength}
                showByValue={showByValue}
                onPageChange={onPageChange}
                onSizeChange={onPageSizeChange}
            />
        )
    }

    return (
        <div>
            <div className="table-header-container">
                <div className="filter-container">
                    <SearchInput onSearch={(searchValue) => setSearchString(filtersDispatch, searchValue)} />
                    <div>
                        <Button 
                            icon={FilterIcon} 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            Filter
                        </Button>
                        {isFilterOpen && renderTableFilter()}
                    </div>
                </div>
                {!!rowLength && renderPageControl()}
            </div>
        </div>
    )
}

TableHeaderControls.propTypes = {
    rowLength: PropTypes.number,
    advancedfilters: PropTypes.array,
    filtersValues: PropTypes.object
};

export default TableHeaderControls;
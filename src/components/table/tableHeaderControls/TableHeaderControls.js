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
import { setCurrentPage, setSearchString, setSelectedFilters, setShowByValue } from "../store/actionCreators/tableFiltersActions";

const TableHeaderControls = ({
    advancedfilters,
    rowLength,
    filterControls,
    filterControlsDispatch
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const {
        currentPage,
        showByValue,
        selectedFilters
    } = filterControls;

    const onPageSizeChange = (size) => {
        setShowByValue(filterControlsDispatch, size);
    }

    const onPageChange = (currentPage) => {
        setCurrentPage(filterControlsDispatch, currentPage);
    }

    const onSearchFilter = (selectedValues) => {
        setIsFilterOpen(false);
        setSelectedFilters(filterControlsDispatch, selectedValues);
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
                currentPage={currentPage}
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
                    <SearchInput onSearch={(searchValue) => setSearchString(filterControlsDispatch, searchValue)} />
                    <div>
                        <Button 
                            showBadge={true}
                            badgeCount={Object.keys(selectedFilters).length}
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
    filterControls: PropTypes.object
};

export default TableHeaderControls;
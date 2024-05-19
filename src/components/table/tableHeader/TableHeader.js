import { useState } from "react";
import { FilterIcon } from "../../../assets";
import Button from "../../button/Button";
import Dropdown from "../../dropdown/Dropdown";
import Pagination from "../../pagination/Pagination";
import SearchInput from "../../searchInput/SearchInput";
import TableFilter from "../tableFilter/TableFilter";

const SHOW_BY_OPTIONS = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 }
];

const TableHeader = ({
    filters,
    rowLength,
    showByValue,
    onSelectedPageChange,
    onFilterSearch,
    setShowByValue
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const renderShowBySelect = () => {
        return (
            <Dropdown 
                options={SHOW_BY_OPTIONS}
                selectedValue={showByValue}
                onSelect={(selectedOption) => setShowByValue(selectedOption.value)}/>
        )
    }

    const onSearchFilter = (selectedValues) => {
        setIsFilterOpen(false);
        onFilterSearch(selectedValues)
    }

    const renderTableFilter = () => {
        return <TableFilter 
            inputList={filters}
            onSearch={onSearchFilter}
            onCancel={() => setIsFilterOpen(false)}/>
    }

    return (
        <div>
            <div className="table-header-container">
                <div className="filter-container">
                    <SearchInput />
                    <div>
                        <Button icon={FilterIcon} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            Filter
                        </Button>
                        {isFilterOpen && renderTableFilter()}
                    </div>
                </div>
                <div className="page-control-container">
                    {/* Show select */}
                    {renderShowBySelect()}
                    {/* Pagination */}
                    <Pagination
                        onSelectedPageChange={onSelectedPageChange}
                        rowLength={rowLength}
                        showByValue={showByValue} />
                </div>
            </div>
        </div>
    )
}

export default TableHeader;
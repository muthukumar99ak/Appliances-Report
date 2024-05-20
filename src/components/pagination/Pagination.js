import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from "../../assets/images";
import Dropdown from '../dropdown/Dropdown';
import './Pagination.scss';

const SHOW_BY_OPTIONS = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 }
];

const Pagination = ({
    rowLength = 0,
    pageNumber = 1,
    showByValue = 10,
    onSizeChange = () => undefined,
    onPageChange = () => undefined
}) => {
    // Get how many numbers to show by rowLength and showByValue
    const listToShow = Math.ceil(rowLength / showByValue);

    const renderPrevPageIcon = () => {
        return (
            <span
                className={`pagination-arrow ${pageNumber === 1 ? "disabled" : ""}`}
                onClick={() => onPageChange(pageNumber - 1)}
            >
                <ChevronLeft />
            </span>
        )
    }

    const renderNextPageIcon = () => {
        return (
            <span
                className={`pagination-arrow ${pageNumber === listToShow ? "disabled" : ""}`}
                onClick={() => onPageChange(pageNumber + 1)}
            >
                <ChevronRight />
            </span>
        )
    }

    const renderPaginationOptions = (index) => {
        const value = index + 1;
        const isCurrentPage = pageNumber === value;
        return (
            <li
                key={index + 1}
                className={isCurrentPage ? "active" : ""}
                onClick={() => onPageChange(value)}
                disabled={isCurrentPage}
            >
                {value}
            </li>
        )
    }

    const renderShowBySelect = () => {
        return (
            <Dropdown
                options={SHOW_BY_OPTIONS}
                selectedValue={showByValue}
                onSelect={(selectedOption) => selectedOption && onSizeChange(selectedOption.value)}
            />
        )
    }

    return (
        <div className="page-control-container">
            {renderShowBySelect()}
            <div className="pagination-container">
                {renderPrevPageIcon()}
                <ul className="pagination-list">
                    {Array.from(
                        { length: listToShow },
                        (_, index) => renderPaginationOptions(index)
                    )}
                </ul>
                {renderNextPageIcon()}
            </div>
        </div>
    )
}

Pagination.propTypes = {
    rowLength: PropTypes.number,
    pageNumber: PropTypes.number,
    showByValue: PropTypes.number,
    onSizeChange: PropTypes.func,
    onPageChange: PropTypes.func
};

export default Pagination;
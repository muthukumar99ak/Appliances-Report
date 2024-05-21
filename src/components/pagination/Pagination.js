import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from "../../assets/images";
import Dropdown from '../dropdown/Dropdown';
import './Pagination.scss';
import usePagination from '../../customHooks/usePagination';

const SHOW_BY_OPTIONS = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 }
];

const Pagination = ({
    rowLength = 0,
    currentPage = 1,
    showByValue = 10,
    onSizeChange = () => undefined,
    onPageChange = () => undefined
}) => {
    const {
        totalPages,
        getPageNumbers
    } = usePagination(rowLength, showByValue, currentPage);

    const renderPrevPageIcon = () => {
        return (
            <span
                className={`pagination-arrow ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft />
            </span>
        )
    }

    const renderNextPageIcon = () => {
        return (
            <span
                className={`pagination-arrow ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRight />
            </span>
        )
    }

    const renderPaginationOptions = (index) => {
        const value = index;
        const isCurrentPage = currentPage === value;
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
                    {getPageNumbers().map(number => renderPaginationOptions(number))}
                </ul>
                {renderNextPageIcon()}
            </div>
        </div>
    )
}

Pagination.propTypes = {
    rowLength: PropTypes.number,
    currentPage: PropTypes.number,
    showByValue: PropTypes.number,
    onSizeChange: PropTypes.func,
    onPageChange: PropTypes.func
};

export default Pagination;
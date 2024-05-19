import './Pagination.scss';
import { ChevronLeft, ChevronRight } from "../../assets";
import { useEffect, useState } from 'react';

const Pagination = ({
    rowLength,
    showByValue,
    onSelectedPageChange
}) => {
    const [selectedPage, setSelectedPage] = useState(1);
    const listToShow = Math.ceil(rowLength / showByValue);

    useEffect(() => {
        setSelectedPage(1);
    }, [
        showByValue
    ])

    const handlePageClick = (value) => {
        setSelectedPage(value);
        onSelectedPageChange(value);
    }

    const renderPrevPageIcon = () => {
        return (
            <span
                className={`pagination-arrow ${selectedPage === 1 ? "disabled" : ""}`}
                onClick={() => handlePageClick(selectedPage - 1)}
            >
                <ChevronLeft />
            </span>
        )
    }

    const renderNextPageIcon = () => {
        return (
            <span
                className={`pagination-arrow ${selectedPage === listToShow ? "disabled" : ""}`}
                onClick={() => handlePageClick(selectedPage + 1)}
            >
                <ChevronRight />
            </span>
        )
    }

    const renderPaginationOptions = (index) => {
        const value = index + 1;
        const isCurrentPage = selectedPage === value;
        return (
            <li
                key={index + 1}
                className={isCurrentPage ? 'active' : ""}
                onClick={() => handlePageClick(value)}
                disabled={isCurrentPage}
            >
                {value}
            </li>
        )
    }

    return (
        <div className="pagination-container">
            {renderPrevPageIcon()}
            <ul className="pagination-list">
                {Array.from({ length: listToShow }, (_, index) => renderPaginationOptions(index))}
            </ul>
            {renderNextPageIcon()}
        </div>
    )
}

export default Pagination;
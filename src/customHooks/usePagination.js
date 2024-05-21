const usePagination = (
    rowLength, 
    showByValue,
    currentPage
) => {
    // Get how many numbers to show by rowLength and showByValue
    const totalPages = Math.ceil(rowLength / showByValue);

    const getPageNumbers = () => {
        const pageNumbers = [];
        // Number of page links to show at one time
        const maxPageNumbers = 8;
        let startPage, endPage;

        if (totalPages <= maxPageNumbers) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const sumPageNumber = maxPageNumbers + currentPage;
            if (currentPage <= 3) {
                startPage = 1;
                endPage = maxPageNumbers;
            } else if (sumPageNumber > totalPages) {
                startPage = (totalPages - maxPageNumbers) + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage;
                endPage = sumPageNumber - 1
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return {
        totalPages,
        getPageNumbers
    }
}

export default usePagination;
import { useCallback, useEffect, useState } from 'react';
import './Table.scss';
import TableHeader from './tableHeader/TableHeader';

const Table = ({
    rowData = [],
    columns = [],
    filters = [],
    onFilter
}) => {
    const [showByValue, setShowByValue] = useState(10);
    const [rowsData, setRowsData] = useState(rowData);

    const onSelectedPageChange = useCallback(
        (selectedPage = 1) => {
            const data = [...rowData];
            setRowsData(data.slice(
                (selectedPage - 1) * showByValue,
                selectedPage * showByValue
            ));
        },
        [
            rowData,
            showByValue
        ]
    )

    useEffect(() => {
        onSelectedPageChange();
    }, [
        showByValue,
        onSelectedPageChange
    ])

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

    const renderTableRows = () => {
        return rowsData.map((row) => (
            <tr key={row.serialNo}>
                {renderRowColumns(row)}
            </tr>
        ))
    }

    const renderHeader = () => {
        return <TableHeader
            onFilterSearch={onFilter}
            filters={filters}
            onSelectedPageChange={onSelectedPageChange}
            setShowByValue={setShowByValue}
            showByValue={showByValue}
            rowLength={rowData.length} />
    }

    return (
        <div className='table-container'>
            {renderHeader()}
            <table className='table'>
                <thead className='table-header'>
                    {renderTableHeaderColumns()}
                </thead>
                <tbody className='table-body'>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
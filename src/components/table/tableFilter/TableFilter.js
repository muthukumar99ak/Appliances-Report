// Pre defined
import { useState } from "react";
import PropTypes from 'prop-types';
// Components
import Button from "../../button/Button";
import Dropdown from "../../dropdown/Dropdown";
// Constants
import INPUT_TYPES from "../../../constants/inputTypes";

const { SELECT } = INPUT_TYPES;

const TableFilter = ({
    inputList = [],
    onSearch = () => undefined,
    onCancel = () => undefined,
    selectedFilters = {}
}) => {
    const [selectedFilterValues, setSelectedFilterValues] = useState(selectedFilters);

    const onChangeSelect = (key, option) => {
        // Add filter if option is not null
        // Delete filter value if option is null
        if (option) {
            setSelectedFilterValues({
                ...selectedFilterValues,
                [key]: option?.value || ""
            })
        } else {
            let selectedValues = { ...selectedFilterValues };
            delete selectedValues[key];
            setSelectedFilterValues(selectedValues);
        }
    }

    const isSearchDisabled = () => {
        // Search is disabled
        // When selected filters length is zero And Prev selected filters length is zero
        // So that the user can clear the values and make search
        return Object.keys(selectedFilterValues).length === 0 && Object.keys(selectedFilters).length === 0;
    }

    const renderInputByType = (input) => {
        const {
            key,
            type,
            options = []
        } = input;

        // Render Dropdown or Input element based on the type of the input
        switch (type) {
            case SELECT:
                return (
                    <Dropdown
                        key={selectedFilterValues[key]}
                        includeClearIcon={true}
                        showLabel={false}
                        options={options || []}
                        onSelect={(option) => onChangeSelect(key, option)}
                        selectedValue={selectedFilterValues[key] || null}
                    />
                );
            default:
                return (
                    <input type="text"></input>
                )
        }
    }

    const renderInputs = () => {
        // Render inputs from input list prop
        return inputList.map(input => {
            return <div key={input.key}>
                <label className="input-label">{input.label || "Select"}</label>
                {renderInputByType(input)}
            </div>
        })
    }

    const renderActionButtons = () => {
        return (
            <div className="action-buttons">
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={() => setSelectedFilterValues({})}>Clear</Button>
                <Button
                    disabled={isSearchDisabled()}
                    onClick={() => onSearch(selectedFilterValues)}>
                    Search
                </Button>
            </div>
        )
    }

    return (
        <div className="filter-input-container">
            <h4 className="filter-title">Filters</h4>
            <div className="filter-inputs">
                {renderInputs()}
            </div>
            {renderActionButtons()}
        </div>
    )
}

TableFilter.propTypes = {
    inputList: PropTypes.array,
    onSearch: PropTypes.func,
    onCancel: PropTypes.func,
    selectedFilters: PropTypes.object
};

export default TableFilter;
import { useState } from "react";
import Button from "../../button/Button";
import INPUT_TYPES from "../../../constants/inputTypes";
import Dropdown from "../../dropdown/Dropdown";

const { SELECT, INPUT } = INPUT_TYPES;

const TableFilter = ({
    inputList = [],
    onSearch,
    onCancel
}) => {
    const [selectedFilterValues, setSelectedFilterValues] = useState({});

    const onChangeSelect = (key, option) => {
        setSelectedFilterValues({
            ...selectedFilterValues,
            [key]: option.value
        })
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
                return <Dropdown
                    showLabel={false}
                    options={options || []}
                    onSelect={(option) => onChangeSelect(key, option)}
                    selectedValue={selectedFilterValues[key] || null}
                />;
            default:
                return <input type="text"></input>
        }
    }

    const renderInputs = () => {
        return inputList.map(input => {
            return <div key={input.key}>
                <label className="input-label">{input.label || "Select"}</label>
                {renderInputByType(input)}
            </div>
        })
    }

    return (
        <div className="filter-input-container">
            <h4 className="filter-title">Filters</h4>
            <div className="filter-inputs">
                {renderInputs()}
            </div>
            <div className="action-buttons">
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onSearch(selectedFilterValues)}>Search</Button>
            </div>
        </div>
    )
}

export default TableFilter;
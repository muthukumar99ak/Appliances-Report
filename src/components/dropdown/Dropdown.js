import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, CrossIcon } from '../../assets/images';
import './Dropdown.scss';

const Dropdown = ({
    options,
    selectedValue,
    showLabel = true,
    includeClearIcon = false,
    onSelect = () => undefined
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        () => options.find(option => option.value === selectedValue) || null
    );
    const dropdownRef = useRef(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onSelect(option);
    };

    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const onClear = (e) => {
        e.stopPropagation();
        setSelectedOption(null);
        onSelect(null);
    }

    const renderOptions = () => {
        return (
            <div className="dropdown-list">
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`dropdown-item ${selectedOption?.value === option.value ? "selected" : ""}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        )
    }

    const renderClearIcon = () => {
        return selectedOption?.label && includeClearIcon
            ? (
                <span 
                    className='clear-icon' 
                    onClick={onClear}
                >
                    <CrossIcon />
                </span>
            )
            : "";
    }

    const renderSelectBox = () => {
        return (
            <div 
                className="dropdown-header" 
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption?.label || 'Select an option'}
                {renderClearIcon()}
                <ChevronDown className='down-icon' />
            </div>
        )
    }

    return (
        <div className='dropdown-container'>
            {showLabel && <label className='show-label'>Show</label>}
            <div 
                className='selectbox-container' 
                ref={dropdownRef}
            >
                {renderSelectBox()}
                {isOpen && renderOptions()}
            </div>
        </div>
    );
};

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
    onSelect: PropTypes.func,
    showLabel: PropTypes.bool,
    includeClearIcon: PropTypes.bool
};

export default Dropdown;
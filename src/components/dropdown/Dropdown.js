import { useEffect, useRef, useState } from 'react';
import './Dropdown.scss';
import { ChevronDown } from '../../assets';

const Dropdown = ({
    options,
    onSelect,
    selectedValue,
    showLabel = true
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

    const renderOptions = () => {
        return (
            <div className="dropdown-list">
                {options.map((option) => (
                    <div
                        key={option.value}
                        className="dropdown-item"
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        )
    }

    const renderSelectBox = () => {
        return (
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption?.label || 'Select an option'}
                <ChevronDown className='down-icon' />
            </div>
        )
    }

    return (
        <div className='dropdown-container'>
            {showLabel && <label className='show-label'>Show</label>}
            <div className='selectbox-container' ref={dropdownRef}>
                {renderSelectBox()}
                {isOpen && renderOptions()}
            </div>
        </div>
    );
};

export default Dropdown;
import PropTypes from 'prop-types';
import { useState } from 'react';
import { SearchIcon } from '../../assets/images';
import './SearchInput.scss'

const SearchInput = ({
    onSearch = () => undefined
}) => {
    const [query, setQuery] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch(query);
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className='search-input-container'>
            <input
                type="text"
                placeholder="Search device serial"
                value={query}
                onChange={handleChange}
                onKeyUp={handleKeyPress}
            />
            <SearchIcon />
        </div>
    );
}

SearchInput.propTypes = {
    onSearch: PropTypes.func
};

export default SearchInput;
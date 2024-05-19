import { useState } from 'react';
import './SearchInput.scss'
import { SearchIcon } from '../../assets';

const SearchInput = ({
    onSearch = () => {}
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
                placeholder="Search"
                value={query}
                onChange={handleChange}
                onKeyUp={handleKeyPress}
            />
            <SearchIcon />
        </div>
    );
}

export default SearchInput;
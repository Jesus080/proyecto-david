import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ 
  placeholder = 'Buscar...', 
  onSearch, 
  debounceTime = 300,
  className = ''
}) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [value, debounceTime, onSearch]);

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className={`search-bar ${isFocused ? 'search-bar-focused' : ''} ${className}`}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && (
        <button 
          onClick={handleClear} 
          className="search-clear"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;

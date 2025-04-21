import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = ({
  data = [],
  fieldsToSearch = [],
  onFilteredData = () => {},
  placeholder = 'Search...',
  debounceDelay = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const lowerSearch = searchTerm.toLowerCase();

      const filtered = data.filter(item =>
        fieldsToSearch.some(field =>
          item[field]?.toString().toLowerCase().includes(lowerSearch)
        )
      );

      onFilteredData(filtered);
    }, debounceDelay);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, data, fieldsToSearch, onFilteredData, debounceDelay]);

  return (
    <Search
      placeholder={placeholder}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: 300, marginBottom: 16 }}
      allowClear
    />
  );
};

export default SearchBar;

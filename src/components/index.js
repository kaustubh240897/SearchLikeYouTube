import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import List from './list';
import CustomInput from './customInput';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetch('http://www.mocky.io/v2/5ba8efb23100007200c2750c')
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setSearchResults(res);
      });
  }, []);

  useEffect(() => {
    if (selectedItem !== null && cardRefs.current[selectedItem]) {
      cardRefs.current[selectedItem].focus();
    }
  }, [selectedItem]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const results = data.filter((item) => {
      // Convert all values to lowercase for case-insensitive search
      const values = Object.values(item).map((value) =>
        typeof value === 'string' ? value.toLowerCase() : ''
      );

      return values.some((value) => value.includes(query.toLowerCase()));
    });

    setSearchResults(results);
  };

  const handleCardClick = (id) => {
    setSelectedItem(id);
    setIsMouseActive(true);
  };

  const handleCardMouseEnter = (id, itemId) => {
    if (!isMouseActive) {
      setIsMouseActive(true);
    }
    setSearchQuery(itemId);
    setSelectedItem(id);
  };

  const handleCardMouseLeave = () => {
    if (isMouseActive && selectedItem === null) {
      setIsMouseActive(false);
    }
  };

  const handleContainerKeyDown = (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }

    if (!isMouseActive) {
      setIsMouseActive(true);
    }
    console.log("searchResults",searchResults);
    if (e.key === 'ArrowUp') {
      const prevId =
        selectedItem === null || selectedItem === 0 ? 0 : selectedItem - 1;
      setSelectedItem(prevId);
      setSearchQuery(searchResults[prevId]?.id);
    } else if (e.key === 'ArrowDown') {
      console.log("mmmmm",selectedItem, searchResults.length)
      const nextId =
        selectedItem === null
          ? 0
          : selectedItem+1 >= searchResults.length || selectedItem === cardRefs.current.length - 1
          ? 0
          : selectedItem + 1;
      setSelectedItem(nextId);
      console.log(nextId, searchResults[nextId]);
      setSearchQuery(searchResults[nextId]?.id);
    }
  };

  const onKeyDownInput = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isMouseActive) {
        setIsMouseActive(true);
      }
      const nextId = selectedItem === null ? 0 : selectedItem + 1;
      setSelectedItem(nextId);
    }
  };

  return (
    <div className='mainContainer'>
      <div className='innerContainer'>
        <CustomInput
          value={searchQuery}
          onKeyDown={onKeyDownInput}
          onChange={handleSearch}
        />
        <div
          onKeyDown={handleContainerKeyDown}
          onMouseEnter={() => setIsMouseActive(true)}
          onMouseLeave={() => setIsMouseActive(false)}
          tabIndex={0}
          className='listContainer'
        >
          <List
            results={searchResults}
            selectedItem={selectedItem}
            handleCardClick={handleCardClick}
            handleCardMouseEnter={handleCardMouseEnter}
            handleCardMouseLeave={handleCardMouseLeave}
            cardRefs={cardRefs}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

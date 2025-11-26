import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = ({ apiUrl }) => {
  const [search, setSearch] = useState(''); // Value of the search bar
  const [searchData, setSearchData] = useState([]); // State to store search results
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setSearch("");
    setSearchData([]);
  };

  useEffect(() => {
    const searchFeedbacks = async (search) => {
      try {
        const url = `${apiUrl}?fieldname=title&partialvalue=${search}`;
        const res = await fetch(url);
        const data = await res.json();
        setSearchData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (search !== "") {
      searchFeedbacks(search);
    } else {
      setSearchData([]);
    }
  }, [search, apiUrl]);

  return (
    <section className='search_section'>
      <div className='search_input_div'>
        <FontAwesomeIcon icon={faSearch} className='search_icon' />
        <input
          type='text'
          className='search_input'
          placeholder='Search...'
          autoComplete='off'
          onChange={handleChange}
          value={search}
        />
        {search !== "" && (
          <FontAwesomeIcon icon={faTimes} className='clear_icon' onClick={handleClose} />
        )}
      </div>

      {searchData.length > 0 && (
        <div className='search_result'>
          {searchData.map((data, index) => (
            <Link
              key={index}
              className='search_suggestion_line'
              to={`/jobs/${data.id}`}
            >
              {data.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBar;
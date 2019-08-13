import React, { useState, useEffect, useCallback, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import { getIngredient, ingredientArray } from '../services/ingredient';

const Search = React.memo(props => {
  const { setFilteredIngs } = props;
  const [serachText, setSearchText] = useState('');

  const inputRef = useRef();

  const getIngedients = useCallback(async function (text) {
    try {
      const response = await getIngredient(text);
      setFilteredIngs(ingredientArray(response));
    } catch (error) {

    }
  }, [setFilteredIngs])


  useEffect(() => {
    const timer = setTimeout(() => {
      if(serachText === inputRef.current.value) {
        getIngedients(serachText)
      }
    }, 3000);
    return () => {
      console.log('Clearing setTimeout(()');
      clearTimeout(timer);
    }
  }, [serachText, getIngedients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={serachText}
            onChange={(e) => setSearchText(e.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;

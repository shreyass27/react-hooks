import React, { useState, useEffect, useCallback, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import { getIngredient, ingredientArray } from '../services/ingredient';
import useHttp from '../../hooks/http.hook';

const Search = React.memo(props => {
  const { setFilteredIngs } = props;
  const [serachText, setSearchText] = useState('');
  const { sendRequest, loader } = useHttp();

  const inputRef = useRef();

  const getIngedients = useCallback(async (text) => {
    const response = await sendRequest(getIngredient, 'Error while getting ingredients', text);
    setFilteredIngs(ingredientArray(response));
  }, [setFilteredIngs, sendRequest]);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (serachText === inputRef.current.value) {
        getIngedients(serachText)
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [serachText, getIngedients]);

  return (
    <React.Fragment>
      {loader}
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
    </React.Fragment>
  );
});

export default Search;

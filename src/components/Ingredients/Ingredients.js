import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { postIngredient, getIngredient } from '../services/ingredient';

const Ingredients = React.memo(props => {
  const [ ingredients, setIngredients ] = useState([]);

  useEffect(() => {
    getIngredients();
  }, [])

  async function getIngredients() {
    try {
      const response = await getIngredient();

      const ingredients = Object.keys(response).map( key => ({
        id: key,
        ...response[key]
      }));
      
      setIngredients(ingredients);
    } catch(error) {
      console.log('Error in getIngredients func', error);

    }
  }

  async function addIngredients(ingredient) {
    const response = await postIngredient(ingredient);
    console.log('addIngredients', response);
    setIngredients(prevIngredients => [...prevIngredients, {
      id: response.name,
      ...ingredient
    }]);
  }

  function removeIngredients(id) {
    setIngredients(prevIngredients => prevIngredients.filter(ing => id !== ing.id));
  }

  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredients} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
})

export default Ingredients;

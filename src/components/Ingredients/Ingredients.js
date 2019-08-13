import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { postIngredient, deleteIngredient } from '../services/ingredient';

const Ingredients = React.memo(props => {
  const [ ingredients, setIngredients ] = useState([]);

  useEffect(() => {
    console.log('RENDERING Ingredients Component', ingredients);
  })

  async function addIngredients(ingredient) {
    const response = await postIngredient(ingredient);
    console.log('addIngredients', response);
    setIngredients(prevIngredients => [...prevIngredients, {
      id: response.name,
      ...ingredient
    }]);
  }

  async function removeIngredients(id) {
    try {
      await deleteIngredient(id);
      setIngredients(prevIngredients => prevIngredients.filter(ing => id !== ing.id));
    } catch (error) {
      console.log('function removeIngredients(id)', error);
    }
  }

  // useCallback is used to avoid re-declacration of a given function  on each render cycle
  const setFilteredIngs = useCallback(function (ingredients) {
    setIngredients(ingredients);
  }, [setIngredients]);

  return (
    <div className="App">
      <IngredientForm addIngredients={addIngredients}/>

      <section>
        <Search  setFilteredIngs={setFilteredIngs}  />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
})

export default Ingredients;

import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { postIngredient, deleteIngredient } from '../services/ingredient';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = React.memo(props => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setLoader] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    console.log('RENDERING Ingredients Component', ingredients);
  })

  async function addIngredients(ingredient) {
    try {
      setLoader(true);
      const response = await postIngredient(ingredient);
      setLoader(false);
      setIngredients(prevIngredients => [...prevIngredients, {
        id: response.name,
        ...ingredient
      }]);
    } catch (error) {
      setLoader(false);
      setError('Something went wrong');
      console.log('function addIngredients(idingredient)', error);
    }
  }

  async function removeIngredients(id) {
    try {
      setLoader(true);
      await deleteIngredient(id);
      setLoader(false);
      setIngredients(prevIngredients => prevIngredients.filter(ing => id !== ing.id));
    } catch (error) {
      setLoader(false);
      setError('Something went wrong');
      console.log('function removeIngredients(id)', error);
    }
  }

  // useCallback is used to avoid re-declacration of a given function  on each render cycle
  const setFilteredIngs = useCallback(function (ingredients) {
    setIngredients(ingredients);
  }, [setIngredients]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={() => setError(null)}>{error}</ErrorModal> }
      <IngredientForm addIngredients={addIngredients} isLoading={isLoading} />

      <section>
        <Search setFilteredIngs={setFilteredIngs} />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
})

export default Ingredients;

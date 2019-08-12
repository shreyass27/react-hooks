import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = React.memo(props => {
  const [ ingredients, setIngredients ] = useState([]);

  function addIngredients(ingredient) {
    setIngredients(prevIngredients => [...prevIngredients, {
      id: Math.random().toString(),
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

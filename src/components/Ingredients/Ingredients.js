import React, { useState, useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { postIngredient, deleteIngredient } from '../services/ingredient';
import ErrorModal from '../UI/ErrorModal';

// Component Using UseState
export const Ingredients = React.memo(props => {
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

  function clearError() {
    setError(null);
  }

  // useCallback is used to avoid re-declacration of a given function  on each render cycle
  const setFilteredIngs = useCallback(function (ingredients) {
    setIngredients(ingredients);
  }, [setIngredients]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm addIngredients={addIngredients} isLoading={isLoading} />

      <section>
        <Search setFilteredIngs={setFilteredIngs} />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
});

// Same Component Implementation using useReducer 
// useReducer Hook usage  

const actionTypes = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
  REQ: 'REQ',
  RES: 'RES',
  ERR: 'ERR',
  CLR: 'CLR'
};

const ingredientReducer = (currentState, action) => {
  switch (action.type) {
    case actionTypes.SET:
      return action.ingredients;
    case actionTypes.ADD:
      return [...currentState, action.ingredient];
    case actionTypes.DELETE:
      return currentState.filter(ing => action.id !== ing.id);
    default: return currentState;
  }
}

const httpStateReducer = (currentState, action) => {
  switch (action.type) {
    case actionTypes.REQ:
      return {
        ...currentState,
        loading: true,
        error: ''
      };
    case actionTypes.RES:
    case actionTypes.CLR:
      return {
        ...currentState,
        loading: false,
        error: null
      };
    case actionTypes.ERR:
      return {
        ...currentState,
        loading: true,
        error: action.error
      };
    default: return currentState;
  }
}

const IngredientsRed = React.memo(props => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpStateReducer, {
    loading: false,
    error: null
  });

  const addIngredients = useCallback(async (ingredient) => {
    try {
      dispatchHttp({ type: actionTypes.REQ });
      const response = await postIngredient(ingredient);
      dispatchHttp({ type: actionTypes.RES });
      dispatch({
        type: actionTypes.ADD,
        ingredient: {
          id: response.name,
          ...ingredient
        }
      });
    } catch (error) {
      dispatchHttp({ type: actionTypes.ERR, error: 'Something went wrong' });
      console.log('function addIngredients(idingredient)', error);
    }
  }, [])

   const removeIngredients = useCallback(async (id) => {
    try {
      dispatchHttp({ type: actionTypes.REQ });
      await deleteIngredient(id);

      dispatchHttp({ type: actionTypes.RES });
      dispatch({
        type: actionTypes.DELETE,
        id
      })
    } catch (error) {
      dispatchHttp({ type: actionTypes.ERR, error: 'Something went wrong' });
      console.log('function removeIngredients(id)', error);
    }
  }, [])

  const clearError = useCallback(() => {
    dispatchHttp({ type: actionTypes.CLR });
  }, [])

  // useCallback is used to avoid re-declacration of a given function  on each render cycle
  const setFilteredIngs = useCallback(function (ingredients) {
    dispatch({
      type: actionTypes.SET,
      ingredients
    })
  }, []);

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm addIngredients={addIngredients} isLoading={httpState.loading} />

      <section>
        <Search setFilteredIngs={setFilteredIngs} />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredients} />
      </section>
    </div>
  );
});

export default IngredientsRed;

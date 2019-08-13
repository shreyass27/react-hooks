import React, { Fragment, useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';
import LoadingIndicator from '../UI/LoadingIndicator';
// import Example from './Example';

const IngredientForm = React.memo(props => {
  const submitHandler = event => {
    event.preventDefault();
    props.addIngredients({
      title,
      amount
    })
    // ...
  };

  // Using Object for state
  // const [ingredient, setIngredient] = useState({ title: 'Cool', amount: '' });

  // Using individual state 
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  function handleUpdate(event) {
    const { name, value } = event.target;
    if(name === 'amount') {
      setAmount(value);
    } else {
      setTitle(value);
    }
    // setIngredient(prevIng => ({ ...prevIng, [name]: value }))/;
  }

  return (
    <Fragment>
      <section className="ingredient-form">
        <Card>
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label htmlFor="title">Name</label>
              <input type="text" id="title" name="title" value={title} onChange={handleUpdate} />
            </div>
            <div className="form-control">
              <label htmlFor="amount">Amount</label>
              <input type="number" id="amount" name="amount" value={amount} onChange={handleUpdate} />
            </div>
            <div className="ingredient-form__actions">
              <button type="submit">Add Ingredient</button>
              {props.isLoading && <LoadingIndicator />}
            </div>
          </form>
        </Card>
      </section>
      {/* <Example title={title} amount={amount} /> */}
    </Fragment>
  );
});

export default IngredientForm;

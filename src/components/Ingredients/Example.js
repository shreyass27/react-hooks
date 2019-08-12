import React, { useState, useEffect } from 'react';

const Example = React.memo(props => {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);  

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    console.log('Component Changed');
  })

  return (
    <div>
      <p>{props.title}</p>
      <p>{props.amount}</p>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(prevCount => prevCount + 1 )}>
        Click me
      </button>
    </div>
  );
});

export default Example;
import React from 'react';

import './LoadingIndicator.css';

const LoadingIndicator = () => (
  <div className='loader-container'>
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingIndicator;

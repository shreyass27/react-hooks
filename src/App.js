import React, { useContext } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import AuthContext from './context/auth.context';

const App = props => {
  const aunthConext = useContext(AuthContext);

  if (aunthConext.isAuth) {
    return <Ingredients />;
  };
  return <Auth />;
};

export default App;

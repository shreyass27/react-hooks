import React, { useState } from 'react';

const AuthContext = React.createContext({
    isAuth: false,
    login: () => { }
});

export default AuthContext;

export const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function loginHandler() {
        setIsAuthenticated(true);
    } 
    return <AuthContext.Provider value={{
        isAuth: isAuthenticated,
        login: loginHandler
    }} >
        {props.children}
    </AuthContext.Provider>
}

import React from "react";
const LoginContext = React.createContext();

export default function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    function login() {
        setIsLoggedIn(true);
    }

    return (
        <LoginContext.Provider value={{ isLoggedIn, login }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    return React.useContext(LoginContext);
}
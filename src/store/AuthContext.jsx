import React, {createContext, useEffect, useReducer} from 'react';
import {projectAuth} from "../firebase/config";

export const AuthContext = createContext()

// authReducer is responsible for updating my states
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user:action.payload }
        case "LOGOUT":
            return { ...state, user:null }
        case 'IS_READY':
            return { ...state, user: action.payload, IsReady: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user:null,
        IsReady: false
    })

    useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'IS_READY', payload:user })
      unsub()
    })
    }, [])


    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};


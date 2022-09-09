import { createContext, useEffect, useReducer } from "react";

// this function is to pick up login data  to any page, we're going to add it o all our pages 
const INITIAL_STATE = {
   user: JSON.parse(localStorage.getItem("user")) || null,
   loading: false,
   error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

// functions to check all the logins conditions 
const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
        return {
            user: null,
            loading: true,
            error: null,
        };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
            case "LOGIN_FAILURE":
                return {
                    user: null,
                    loading: false,
                    error: action.payload,
                };
                case "LOGOUT":
                    return {
                        user: null,
                        loading: false,
                        error: null,
                    };
        default:
        return state;
    }
};
// the AuthContextProvider must be wrapped with our applications(index.js) in the sense that you can login in any routes of the applications 
export const AuthContextProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return(
        <AuthContext.Provider 
        value={{ 
            user: state.user, 
            loading: state.loading, 
            error: state.error, 
            dispatch,
             }}
             >
           {children} 
        </AuthContext.Provider>
    );
};
/* eslint-disable react/react-in-jsx-scope */
import {createContext, useState, useEffect} from 'react';
import {useNavigate, Link, Navigate} from 'react-router-dom';
import React from 'react';
import { useHistory } from 'react-router'
import jwt_decode from "jwt-decode";
import api from '../services/api';
import qs from 'querystring';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authToken, setAuthToken] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).authToken : null)

    const [details, setDetails] = useState({login:"", password:""});
    const navigate = useNavigate();

    let loginUser = async (res)=> {
        
        setAuthTokens(res.data);
        setUser(res.data.jwt);
        localStorage.setItem('authTokens', JSON.stringify(res.data))
        window.location.reload(false);

    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }


    return(
    <AuthContext.Provider value={contextData} >
        {children}
    </AuthContext.Provider>
    )
}
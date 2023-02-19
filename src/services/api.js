import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
    }
});

export default api;
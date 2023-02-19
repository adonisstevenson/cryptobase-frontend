import React, {useState, useContext} from "react";
import {Container, Form, Button, Col, Row, Modal} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import api from '../services/api';
import jwt_decode from "jwt-decode";
import AuthContext from '../context/AuthContext'


const Logout = () => {

    const navigate = useNavigate();  
    
    let {logoutUser} = useContext(AuthContext);

    const logout = async () =>{
        logoutUser();
        navigate('/');
    }

    
    logout();


    return(
        ''
        );

   
}

export {Logout};
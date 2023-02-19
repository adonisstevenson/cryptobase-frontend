/* eslint-disable react/react-in-jsx-scope */
import {createContext, useState, useEffect} from 'react';
import React from 'react';

const ALERT_TIME = 10000;
const initialState = {
    message:'sss',
    type:''
}

export const AlertContext = createContext();

// const AlertContext = createContext({
//     ...initialState,
//     setAlert: () => {},
// });


export const AlertProvider = (props) => {

    // const[message, setMessage] = useState('');
    // const[type, setType] = useState('');

    // const setAlert = (message, type) => {
    //     setMessage(message);
    //     setType(type);

    //     setTimeout(() => {
    //         setMessage('');
    //         setType('');
    //     }, ALERT_TIME);
    // }

    const [alert, setAlert] = useState({message:'initial', type:'initial'})

    return(
        <AlertContext.Provider value={{alert, setAlert}} >
            {props.children}
        </AlertContext.Provider>
    )
}


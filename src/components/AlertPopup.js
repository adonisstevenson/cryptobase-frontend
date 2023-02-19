import Alert from "../services/Alert";
import {AlertContext} from "../context/AlertContext";
import React, {useState, useEffect, useLayoutEffect, useContext}  from 'react';

const AlertPopup = () => {
    const {alert} = useContext(AlertContext);

    console.log(alert);
    
    if (alert.message && alert.type){
        return(
            <div className={`alertPopup ${alert.type}`}>
                {alert.message}
            </div>
        )
    }
}

export default AlertPopup;

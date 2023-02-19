import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import "../Toasts.css";


export default function ToastMessage ({message, type}) {

    let msgType;

    switch (type) {
        case "warning":
            
            msgType = "Ostrzeżenie";
            break;
        case "info":
            msgType = "Informacja";
            break;

        default:
            break;
    }

    const [show, setShow] = useState(true);
    const toggleShow = () => setShow(!show);

    return(
        <Toast show={show} onClose={toggleShow} className='toastBasic'>
        <Toast.Header className='messageHeader'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
        <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"/>
        </svg>
            <strong className="me-auto">{msgType}</strong>
        </Toast.Header>
        <Toast.Body className='messageBody'>{message}</Toast.Body>
        </Toast>
    )

}

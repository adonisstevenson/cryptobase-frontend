import React, {useState, useContext, useEffect} from "react";
import {Container, Form, Button, Col, Row, Modal} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import qs from 'querystring';
import api from '../services/api';
import jwt_decode from "jwt-decode";
import AuthContext from '../context/AuthContext'
import ToastMessage from '../components/Messages';

const Register = () => {

    const [errorMessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[form, setForm] = useState({email:"", login:"", first_name:"", password:"", password_repeat:"", start_amount:"", level:"0", publicRankingData:true})

    const[emailInvalid, setEmailInvalid] = useState({status: false, message:""});
    const[loginInvalid, setLoginInvalid] = useState({status: false, message:""});
    const[firstNameInvalid, setFirstNameInvalid] = useState({status: false, message:""});
    const[passwordInvalid, setPasswordInvalid] = useState({status: false, message:""});
    const[startAmountInvalid, setStartAmountInvalid] = useState({status: false, message:""});


    const registerUser = async () =>{
        api.post('/registerUser', form)
        .then(res => {
            console.log("OK", res);
            setErrorMessage(false);
            setMessage(res.data.message);
            setShow(true);
        })
        .catch(error => {
            console.log("error", error);
            setMessage(false);
            setErrorMessage(error.response.data.message);
            setShow(true);

            if (error.response.status === 403){
                setLoginInvalid({status: true, message:"Ten login już istnieje"})
                setFormStep(0);
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        let error = false;

        clearErrors();

        if ((/^\d+$/.test(form.start_amount)) &&
            parseInt(form.start_amount) > 100 &&
            parseInt(form.start_amount) < 20000
            ){
                registerUser();
            }else{
                setStartAmountInvalid({status: true, message: "Kwota startowa musi być liczbą oraz musi być w przedziale 100-20 000 USD"}); error = true;
            }

        console.log(form);
    }

    const handleStep = () => {
        console.log(form);
        
        clearErrors();

        if (formStep === 0){

            let error = false;

            if (form.email.length < 5){setEmailInvalid({status: true, message: "Podaj prawdziwy adres e-mail."}); error = true;}
            if (form.login.length < 5){setLoginInvalid({status: true, message: "Login nie może być krószy niż 5 znaków."}); error = true;}
            if (form.password.length < 5 || form.password.length > 20){setPasswordInvalid({status: true, message: "Długość hasła musi wynosić między 5 a 20 zaków"}); error=true;}
            if (form.password !== form.password_repeat){setPasswordInvalid({status: true, message: "Hasła muszą być takie same"}); error=true;} 
            
            if (!error) setFormStep(1);
            
        } else setFormStep(0);
    }

    const clearErrors = () => {
        setEmailInvalid({...emailInvalid, status: false});
        setLoginInvalid({...loginInvalid, status: false})
        setFirstNameInvalid({...firstNameInvalid, status: false})
        setPasswordInvalid({...passwordInvalid, status: false})
        setStartAmountInvalid({...startAmountInvalid, status: false})
    }

    const[formStep, setFormStep] = useState(0); 

    return(
        <Container style={{position: 'relative'}}>
            <Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Informacja</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}{message}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
            <div className="welcome-logo-box">
                <div className="logo-symbols">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-currency-bitcoin" viewBox="0 0 16 16">
                    <path d="M5.5 13v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.5v1.25c0 .138.112.25.25.25h1a.25.25 0 0 0 .25-.25V13h.084c1.992 0 3.416-1.033 3.416-2.82 0-1.502-1.007-2.323-2.186-2.44v-.088c.97-.242 1.683-.974 1.683-2.19C11.997 3.93 10.847 3 9.092 3H9V1.75a.25.25 0 0 0-.25-.25h-1a.25.25 0 0 0-.25.25V3h-.573V1.75a.25.25 0 0 0-.25-.25H5.75a.25.25 0 0 0-.25.25V3l-1.998.011a.25.25 0 0 0-.25.25v.989c0 .137.11.25.248.25l.755-.005a.75.75 0 0 1 .745.75v5.505a.75.75 0 0 1-.75.75l-.748.011a.25.25 0 0 0-.25.25v1c0 .138.112.25.25.25L5.5 13zm1.427-8.513h1.719c.906 0 1.438.498 1.438 1.312 0 .871-.575 1.362-1.877 1.362h-1.28V4.487zm0 4.051h1.84c1.137 0 1.756.58 1.756 1.524 0 .953-.626 1.45-2.158 1.45H6.927V8.539z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                    </svg>
                </div>
                <div className="logo-name">
                CRYPTOBASE
                </div>
                <div className="logo-sign">
                    <hr style={{margin:'0.5rem 0', border: '1px solid rgba(255, 255, 255, .7)'}} />
                    BY DANIEL GROMAK
                </div>
            </div>
            </Row>
            <Row>
            <Col lg={{span:4, offset: 4}} >
                    <div className="login-box">
                        <center><h2>REJESTRACJA</h2></center>
                        <div className="registerStepBox">
                            <div className="stepBar stepBarLight" onClick={handleStep}></div>
                            <div className={`stepBar ${formStep !== 0 ? 'stepBarLight' : '' }`} onClick={handleStep} ></div>
                            <div style={{clear: 'both'}}></div>
                        </div>
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <div id="dataStep" style={{display: `${formStep === 0 ? 'block' : 'none'}`}}>
                                <center>PODSTAWOWE DANE</center>
                                <br />
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Adres E-mail</Form.Label>
                                    <Form.Control type="email" name="email" className="dark-input" onChange={e => setForm({...form, email: e.target.value})} defaultValue={form.email} isInvalid={emailInvalid.status} />
                                    <Form.Control.Feedback type="invalid">
                                        {emailInvalid.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control type="text" name="login" className="dark-input" onChange={e => setForm({...form, login: e.target.value})} defaultValue={form.login} isInvalid={loginInvalid.status} required/>
                                    <Form.Control.Feedback type="invalid">
                                        {loginInvalid.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Imię</Form.Label>
                                    <Form.Control type="text" name="first_name" className="dark-input" onChange={e => setForm({...form, first_name: e.target.value})} defaultValue={form.first_name} isInvalid={firstNameInvalid.status} required />
                                    <Form.Control.Feedback type="invalid">
                                        {firstNameInvalid.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hasło</Form.Label>
                                    <Form.Control type="password" name="password" className="dark-input" onChange={e => setForm({...form, password: e.target.value})} defaultValue={form.password} isInvalid={passwordInvalid.status} required />
                                    <Form.Control.Feedback type="invalid">
                                        {passwordInvalid.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Powtórz hasło</Form.Label>
                                    <Form.Control type="password" name="passwordRepeat" className="dark-input" onChange={e => setForm({...form, password_repeat: e.target.value})} defaultValue={form.password_repeat} required />
                                </Form.Group>
                                <button className="btnBase btnWide" onClick={handleStep}>DALEJ</button>
                            </div>
                            <div id="profileStep" style={{display: `${formStep === 1 ? 'block' : 'none'}`}}>
                            <center>Profil</center>
                            <br />
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Początkowa kwota (USD)</Form.Label>
                                <Form.Control type="text" name="start_amount" className="dark-input" onChange={e => setForm({...form, start_amount: e.target.value})} defaultValue={form.start_amount} isInvalid={startAmountInvalid.status} required />
                                <Form.Control.Feedback type="invalid">
                                    {startAmountInvalid.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Określ swój poziom</Form.Label>
                                <Form.Select size="sm" name="level" className="dark-input" onChange={e => setForm({...form, level: e.target.value})} defaultValue={form.level} required>
                                    <option value="0">Początkujący</option>
                                    <option value="1">Średnio-zaawansowany</option>
                                    <option value="2">Zaawansowany</option>
                                    <option value="3">Ekspert</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Czy udostępniać twoje statystyki w publicznych rankingach?" 
                                            onChange={e => {e.target.checked ? setForm({...form, publicRankingData: true}) : setForm({...form, publicRankingData: false})}} 
                                            defaultChecked={form.publicRankingData}  />
                            </Form.Group>
                            <br />
                            <center> <button type="submit" className="btnBase btnWide">ZATWIERDŹ</button> </center>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>

        );

}

export {Register};
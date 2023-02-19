import React, {useState, useContext, useEffect} from "react";
import {Container, Form, Button, Col, Row, Modal} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import qs from 'querystring';
import api from '../services/api';
import jwt_decode from "jwt-decode";
import AuthContext from '../context/AuthContext'
import ToastMessage from '../components/Messages';

const SingIn = () => {

    const[dataForm, setDataForm] = useState({email:"", login:"", first_name:"", password:"", password_repeat:""});
    const[profileForm, setProfileForm] = useState({start_amount:"", level:"", publicRankingData:true});

    const [wholeForm, setWholeForm] = useState({email:"", login:"", first_name:"", password:"", password_repeat:"", start_amount:"", level:"", publicRankingData:true});
    const [formStep, setFormStep] = useState(false);

    useEffect(() => {
        console.log("wholeForm updated");
        console.log(wholeForm);
        setWholeForm(wholeForm);
    }, [wholeForm])


    

    const handleChange = input => e =>{
        console.log(input, e.target.value);
        setWholeForm({...wholeForm, [input]: e.target.value});
        console.log(wholeForm);
    }

    


    const ProfileStep = (props) => {
        
        return(
            <Form onSubmit={props.stepChange}>
                <center>Profil</center>
                <br />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Początkowa kwota (USD)</Form.Label>
                    <Form.Control type="text" name="start_amount" className="dark-input" onChange={props.valueChange('start_amount')} defaultValue={wholeForm.start_amount} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Określ swój poziom</Form.Label>
                    <Form.Select size="sm" name="level" className="dark-input" onChange={props.valueChange('level')} defaultValue={wholeForm.level} required>
                        <option value="0">Początkujący</option>
                        <option value="1">Średnio-zaawansowany</option>
                        <option value="2">Zaawansowany</option>
                        <option value="3">Ekspert</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Czy udostępniać twoje statystyki w publicznych rankingach?" 
                                // onChange={e => {e.target.checked ? setFormProfile({...formProfile, publicRankingData: true}) : setFormProfile({...formProfile, publicRankingData: false})}} 
                                defaultChecked={wholeForm.publicRankingData}  />
                </Form.Group>
                <br />
            <center> <button type="submit" className="btnBase btnWide">DALEJ</button> </center>
            </Form>
        )
    }
    
    const DataStep = (props) => {

        return (
            
            <Form onSubmit={props.stepChange}>
                <center>PODSTAWOWE DANE</center>
                <br />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Adres E-mail</Form.Label>
                    <Form.Control type="email" name="email" className="dark-input" onChange={props.valueChange('email')} defaultValue={wholeForm.email} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" name="login" className="dark-input" onChange={props.valueChange('login')} defaultValue={wholeForm.login} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control type="text" name="first_name" className="dark-input" onChange={props.valueChange('first_name')} defaultValue={wholeForm.first_name} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control type="password" name="password" className="dark-input" onChange={props.valueChange('password')} defaultValue={wholeForm.password} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control type="password" name="passwordRepeat" className="dark-input" onChange={props.valueChange('password_repeat')} defaultValue={wholeForm.password_repeat} required />
                </Form.Group>
                <br />
            <center> <button type="submit" className="btnBase btnWide">DALEJ</button> </center>
            </Form>
        )
    };

    const handleStepChange = e => {
        e.preventDefault();

        if ((step.type.name === 'DataStep') && (e.target.email != undefined)){
            console.log("DATA STEP DETECTED");
            setWholeForm({...wholeForm, 
                email: e.target.email.value,
                login: e.target.login.value,
            })
            setStep(<ProfileStep stepChange={handleStepChange} valueChange={handleChange} />)
            setFormStep(1);
        } else{
            console.log('profile submitted')
            setWholeForm({...wholeForm, 
                start_amount: e.target.start_amount.value,
                level: e.target.level.value,
                // publicRankingData: e.target.publicRankingData.value,
            })
            
        }
    }
    
    const[step, setStep] = useState(<DataStep stepChange={handleStepChange} valueChange={handleChange} />);
    
    const handleClick = () => {
        console.log("handleClick");
        setS(1);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(f);
    }
    
    useEffect(() => {
        console.log("STEP CHANGED");
        console.log(step.type.name);
    }, [step])

    const [f, setF] = useState({email:'', name:''});
    const [s, setS] = useState(0);

    return(
        <Container style={{position: 'relative'}}>
            <Row>
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
                            <div className="stepBar stepBarLight" onClick={() => {setStep(<DataStep />)}}></div>
                            <div className={`stepBar ${step.type.name !== "DataStep" ? 'stepBarLight' : '' }`} onClick={() => {setStep(<ProfileStep />)}} ></div>
                            <div style={{clear: 'both'}}></div>
                        </div>
                        <br />
                        <Form onSubmit={handleSubmit}>
                            <div id="data" style={{display: `${s === 0 ? 'block' : 'none'}`}}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Adres E-mail</Form.Label>
                                <Form.Control type="email" name="email" className="dark-input" onChange={e => setF({...f, email: e.target.value})} defaultValue={f.email} required />
                            </Form.Group>
                            <Button onClick={handleClick}>DALEJ</Button>
                            </div>
                            <div id="profile" style={{display: `${s === 1 ? 'block' : 'none'}`}}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Imię</Form.Label>
                                    <Form.Control type="text" name="name" className="dark-input" onChange={e => setF({...f, name: e.target.value})} defaultValue={f.name} required />
                                </Form.Group>
                                <Button type="submit">ZATWIERDŹ</Button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>

        );

}

export {SingIn};
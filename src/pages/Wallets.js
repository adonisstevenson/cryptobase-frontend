import React, {useState, useEffect, useContext}  from 'react';
import {Container, Row} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import api from '../services/api';
import { LineChart, YAxis, CartesianGrid, XAxis, Legend, Line, Tooltip } from 'recharts';
import { TIMEDICT } from '../utils/timeUtils';
import moment from 'moment';
import bitcoin from '../img/bitcoin.png';
import {LoadChart, ErrorChart} from '../components/Charts';
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from '../components/Messages';
import AuthContext from '../context/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';



const Wallets = () => {
    
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    let {user, logoutUser} = useContext(AuthContext);
    let {authTokens, delAuthTokens} = useContext(AuthContext);

    const [accounts, setAccounts] = useState([])
    const [active, setActive] = useState();
    const[navActive, setNavActive] = useState('statistics');

    const getAccounts = async() => {
      api.get(`getUserAccounts/${user.id}`, {headers: {'Authorization': `Token ${user.token}`}})
      .then(res => {
        console.log("accounts");
        console.log(res.data.accounts);
        setAccounts(res.data.accounts)
        setActive(res.data.accounts[0]);
        setLoading(false);
      })
    }
    
    useEffect(() => {
      getAccounts();
    }, [])

    useEffect(() => {
      console.log("ACTIVE CURRENCY", active)
    }, [active])

    const data = [
      {time:'2023-01-01', balance: 120},
      {time:'01.01.2021',	balance: 120},
      {time:'07.01.2021',	balance: 125},
      {time:'13.01.2021',	balance: 118},
      {time:'19.01.2021',	balance: 150},
      {time:'25.01.2021',	balance: 149},
      {time:'31.01.2021',	balance: 160},
      {time:'06.02.2021',	balance: 155},
      {time:'12.02.2021',	balance: 157},
      {time:'18.02.2021',	balance: 160}

    ]

    const Transfer = () => {

      return (
        <Form className="paymentForm">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Kwota</Form.Label>
          <Form.Control type="number" className="dark-input" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Numer rachunku odbiorcy</Form.Label>
          <Form.Control type="text" className="dark-input" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Komentarz</Form.Label>
          <Form.Control type="text" className="dark-input" />
          <Form.Text className="text-muted">
            Opcjonalny opis przelewu
          </Form.Text>
        </Form.Group>
        <button className="btnBase" type="submit">
          WYŚLIJ
        </button>
      </Form>
      )
    }

    const Statistics = () => {
      
      return(
        <LoadChart data={data} height={400} width={736} dataKey="balance" min={data[0].balance} max={data[data.length-1].balance} />    
      )
    }

    const History = () => {

      return(
        <table style={{width: '100%', color: 'rgba(255, 255, 255, 0.7)'}}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Rodzaj</th>
              <th>Kwota</th>
              <th>Saldo po operacji</th>
            </tr>
          </thead>
          <tbody>
            <tr className='line'>
              <td>2022.02.18</td>
              <td>Sprzedaż waluty</td>
              <td>-0.0023 BTC</td>
              <td>0 BTC</td>
            </tr>
            <tr className='line'>
              <td>2022.02.10</td>
              <td>Kupno waluty</td>
              <td>+0.0023 BTC</td>
              <td>0 BTC</td>
            </tr>
          </tbody>
        </table>
      )
    }

    return(
        <Container style={{position: 'relative'}}>
          {
            errorMessage ? 
            (
              <ToastMessage message={errorMessage} type="warning" />
            ) : ('')
          }
            <Row>
              <div className='baseBox'>
                <center>
                  <Form>
                  { loading ? <Spinner animation="grow" /> : (
                    accounts.map((account) => (
                      <div className='accountBoxMini'>
                        <img src={process.env.PUBLIC_URL + '/img/'+(account.currency.shortcut).toLowerCase() + '.png'} width="60px"></img>
                        <p>{account.currency.shortcut}</p>
                        <Form.Check
                        id={`inline-radio-${account.id}`}
                        name="group1"
                        type='radio'
                        checked={active === account}
                        onClick={() => setActive(account)}
                      />
                      </div>
                    ))
                  )
                  }
                </Form>
                </center>
              </div>
            </Row>
            <br /> <br />
            {
              loading ? ('') : (
                <Row>
                <Col xs={3}>
                <div className='cryptoSummary'>
                  <div>
                    <div className='left'>
                  <img src={process.env.PUBLIC_URL + '/img/'+(active.currency.shortcut).toLowerCase() + '.png'} width="80px"></img>
                  </div>
                  <div className='summaryInfo right'>
                    <p><small>{active.currency.name}</small></p>
                    <p><small>Saldo: {active.balance}</small></p>
                  </div>
                  <div style={{'clear': 'both'}}></div>
                  </div>
                </div>
                <br />
                  <div className='operationsNav'>
                    <div className={`navItem ${navActive === 'statistics' ? 'navItemActive' : ''}`}
                          onClick={() => setNavActive('statistics')}>
                      Statystyki
                    </div>
                    <div className={`navItem ${navActive === 'transfer' ? 'navItemActive' : ''}`}
                          onClick={() => setNavActive('transfer')}>
                      Przelej
                    </div>
                    <div className={`navItem ${navActive === 'history' ? 'navItemActive' : ''}`}
                          onClick={() => setNavActive('history')}>
                      Historia
                    </div>
                  </div>
                </Col>
                <Col xs={9}>
                  {
                    navActive === 'transfer' ? <Transfer /> : navActive === 'statistics' ? <Statistics /> : (<History />)
                  }
                </Col>
                </Row>
              )
            }
        </Container>
    );
}
export {Wallets};
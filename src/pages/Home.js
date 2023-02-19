import React, {useState, useEffect, useLayoutEffect, useContext}  from 'react';
import { Link } from "react-router-dom";
import {Alert, Container, Row} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import api from '../services/api';
import { TIMEDICT } from '../utils/timeUtils';
import moment from 'moment';
import bitcoin from '../img/bitcoin.png';
import {LoadChart, ErrorChart} from '../components/Charts';
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from '../components/Messages';
import AuthContext from '../context/AuthContext';

const Home = () => {
  
  let {user, setUser} = useContext(AuthContext);
    
    const [currentBTC, setCurrentBTC] = useState([]);
    
    const [prices, setPrices] = useState([]);
    const [parsedPrices, setParsedPrices] = useState([]);
    const [activePeriod, setActivePeriod] = useState('YEAR');
    const [max, setMax] = useState([]);
    const [min, setMin] = useState([]);
    const [end, setEnd] = useState([]);
    const [start, setStart] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    const [accounts, setAccounts] = useState([])

    const getCurrent = async() => {
      
      api.get(`getCurrentDaily/BTCUSDT`)
      .then(res => {
        setCurrentBTC(res.data);
        console.log(res.data);
      })

    }

    const getAccounts = async() => {
      api.get(`getUserAccounts/${user.id}`, {headers: {'Authorization': `Token ${user.token}`}})
      .then(res => {
        console.log("accounts");
        console.log(res.data.accounts);
        setAccounts(res.data.accounts)
      })
    }

    useEffect(() => {
      getAccounts();
    }, []);

    const fetchData = async(period) => {

        console.log("FETCHING DATA PERIOD", period);
        let endTime = Math.floor(Date.now() / 1000);
        let startTime =  endTime - TIMEDICT[period][0];
        let pair = 'BTCUSDT';

        api.get(`getData/${pair}/${startTime}/${endTime}/${TIMEDICT[period][1]}`)
        .then(res => {
            setPrices(res.data.dataset);
            setMin(res.data.low);
            setMax(res.data.max);
            console.log(res.data.low, res.data.max);
        })
        .catch(error => {
          console.log("ERROR", error);
          setLoading(false);
          setErrorMessage("Wystąpił błąd przy ładowania wykresu.");
        });
    }

    const parseData = async(p) => {
        var parsed = [];
        console.log("parsing data started");
        p.map((p) => {
          let o = {time:0, price:0};

          let parsedTime = moment.unix(p[0]).format("YYYY-MM-DD");
          let roundPrice = Math.round(Number(p[1]));

          o.time = parsedTime;
          o.price = roundPrice;
          parsed.push(o);
        })

        setParsedPrices(parsed);
        console.log("prices parsed");
        return parsed;
    }

    const changePeriod = async(period) => {
      setActivePeriod(period);
    }

    useEffect(() => {
      setLoading(true);
      fetchData(activePeriod);
    }, [activePeriod]);


    useEffect(() => {
      setActivePeriod("YEAR");
      getCurrent();
    }, []);

    //TODO: Replace with something other than parsing data

    useEffect(() => {
      parseData(prices)
      .then(() => {
        if(prices.length > 0) setLoading(false);
      });
    }, [prices]);


    return(
        <Container style={{position: 'relative'}}>
          {
            errorMessage ? 
            (
              <ToastMessage message={errorMessage} type="warning" />
            ) : ('')
          }
            <Row>
            <Col xs={8}>
            <Container>
              <Row>
                <div className='menuInfoBox'>
                  <Container>
                    <Row>
                      <Col xs={6}>
                        <div className='cryptoSummary'>
                          <div className='left'>
                            <img src={bitcoin} className="cryptoIcon" />
                          </div>
                          <div className='summaryInfo right'>
                            <p>${parseFloat(currentBTC.askPrice).toFixed(2)}</p>
                            <p><small>{parseFloat(currentBTC.priceChange).toFixed(2)} USD</small></p>
                            <p>
                              <small className={parseFloat(currentBTC.priceChangePercent) < 0 ? 'red' : 'green'}>
                                {parseFloat(currentBTC.priceChangePercent).toFixed(2)}% 
                              </small>
                            </p>
                          </div>
                          <div style={{'clear': 'both'}}></div>
                        </div>
                      </Col>
                      <Col xs={6}>
                      <div className='openPositions'>
                      <table>
                        <tbody>
                          <tr>
                            <th><p>Otwarte pozycje</p></th>
                          </tr>
                          <tr className='line'>
                            <td>BTC $125.08</td>
                            <td>ETH $800.32</td>
                          </tr>
                          <tr className='line'>
                            <td>BNB $200.32</td>
                            <td> <span className='morePositions'>...</span> </td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Row>
              <br/>
              <Row>
              <div className="chartBox">
              {loading === true ? 
              (
                <LoadingSpinner/>
              ) : 
              (
                errorMessage ? 
                (
                  <ErrorChart message={errorMessage} />
                ) : 
                (
                  <LoadChart data={parsedPrices} height={400} width={736} dataKey="price" min={min} max={max} />    
                )
              )
              }
              </div>
              <div className="periodBox" style={{display: errorMessage ? 'none' : 'block'}} >
                <button className={`periodBtn ${activePeriod === 'HOUR' && 'active'}`} onClick={() => changePeriod('HOUR')} id="1h">1h</button>
                <button className={`periodBtn ${activePeriod === 'DAY' && 'active'}`} onClick={() => changePeriod('DAY')} id="1d">1d</button>
                <button className={`periodBtn ${activePeriod === 'MONTH' && 'active'}`} onClick={() => changePeriod('MONTH')} id="1m">1m</button>
                <button className={`periodBtn ${activePeriod === '3m' && 'active'}`} onClick={() => changePeriod('3m')} id="3m">3m</button>
                <button className={`periodBtn ${activePeriod === '6m' && 'active'}`} onClick={() => changePeriod('6m')} id="6m">6m</button>
                <button id="1r" className={`periodBtn ${activePeriod === 'YEAR' && 'active'}`} onClick={() => changePeriod('YEAR')} >1r</button>
              </div>
              </Row>
            </Container>
            </Col>
            <Col xs={4}>
              <div className='baseBox walletBox'>
                <p className='boxTitle'>Portfele</p>
                <p><small>Majątek ~500.30</small> </p>
                <br />
                <table style={{width:'100%'}}>
                  <tbody >
                    {
                      accounts.map((account) => (
                        <tr className='lineTop'>
                          <td>{account.currency.shortcut}</td>
                          <td class="text-right">{account.balance}</td>
                        </tr>
                      ))
                    }
                    {/* <tr className='lineTop'>
                      <td>BTC</td>
                      <td class="text-right">$125.08</td>
                    </tr>
                    <tr className='lineTop'>
                      <td>BNB</td>
                      <td class="text-right">$200.32</td>
                    </tr>
                    <tr className='lineTop'>
                      <td>BNB</td>
                      <td class="text-right">$200.32</td>
                    </tr>
                    <tr className='lineTop'>
                      <td>BNB</td>
                      <td class="text-right">$200.32</td>
                    </tr>
                    <tr className='lineTop'>
                      <td>BNB</td>
                      <td class="text-right">$200.32</td>
                    </tr>
                    <tr className='lineTop'>
                      <td>BNB</td>
                      <td class="text-right">$200.32</td>
                    </tr>
                    <tr className='lineTop'>
                      <td>BNB</td>
                      <td class="text-right">$200.32</td>
                    </tr> */}
                  </tbody>
                </table>
                <br />
                <center>
                <button className="btnBase"><Link to='wallets'>POKAŻ WIĘCEJ</Link></button>
                </center>
              </div>
              <br />
              <div className='baseBox trxBox'>
                <p className='boxTitle'>Ostatnie transakcje</p>
                <br />
                <table style={{width:'100%'}}>
                  <tbody >
                    <tr className='lineTop'>
                      <td>2022-01-02 10:23</td>
                      <td class="text-right">-$125.08</td>
                    </tr>
                    <tr className='lineTop'>
                      <td>2022-01-02 21:55</td>
                      <td class="text-right">-0.0031 BTC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            </Row>
        </Container>
    );
}
export {Home};
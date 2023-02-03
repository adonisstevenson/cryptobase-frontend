import React, {useState, useEffect, useLayoutEffect}  from 'react';
import {Container, Row} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import api from '../services/api';
import { LineChart, YAxis, CartesianGrid, XAxis, Legend, Line, Tooltip } from 'recharts';
import { TIMEDICT } from '../utils/timeUtils';
import moment from 'moment';
import bitcoin from '../img/bitcoin.png';
import LoadChart from '../components/Charts';
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {

    const [prices, setPrices] = useState([]);
    const [parsedPrices, setParsedPrices] = useState([]);
    const [activePeriod, setActivePeriod] = useState('YEAR');
    const [max, setMax] = useState([]);
    const [min, setMin] = useState([]);
    const [end, setEnd] = useState([]);
    const [start, setStart] = useState([]);
    
    const [loading, setLoading] = useState(true);

    const fetchData = async(period) => {

        console.log("FETCHING DATA PERIOD", period);
        let endTime = Math.floor(Date.now() / 1000);
        let startTime =  endTime - TIMEDICT[period][0];
        let pair = 'BTCUSDT';

        api.get(`getData/${pair}/${startTime}/${endTime}/${TIMEDICT[period][1]}`)
        .then(res => {
            setPrices(res.data.dataset);
            // setLoading(false);
        })
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
    }, []);

    //TODO: Replace with something other than parsing data

    useEffect(() => {
      parseData(prices)
      .then(() => {
        if(prices.length > 0) setLoading(false);
      });
    }, [prices]);


    return(
        <Container>
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
                            <p>$6580.87</p>
                            <p><small>-$50.21</small></p>
                            <p><small>-2.17%</small></p>
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
              <LoadChart data={parsedPrices} height={400} width={736} dataKey="price" />    
              )
              }
              </div>
              <div className="periodBox">
                <button className={`periodBtn ${activePeriod === '1h' && 'active'}`} onClick={() => changePeriod('1h')} id="1h">1h</button>
                <button className={`periodBtn ${activePeriod === '1d' && 'active'}`} onClick={() => changePeriod('1d')} id="1d">1d</button>
                <button className={`periodBtn ${activePeriod === 'MONTH' && 'active'}`} onClick={() => changePeriod('MONTH')} id="1m">1m</button>
                <button className={`periodBtn ${activePeriod === '3m' && 'active'}`} onClick={() => changePeriod('3m')} id="3m">3m</button>
                <button className={`periodBtn ${activePeriod === '6m' && 'active'}`} onClick={() => changePeriod('6m')} id="6m">6m</button>
                <button id="1r" className={`periodBtn ${activePeriod === 'YEAR' && 'active'}`} onClick={() => changePeriod('YEAR')} >1r</button>
              </div>
              </Row>
            </Container>
            </Col>
            <Col xs={4}>
              <div className='walletBox'>
                <p className='boxTitle'>Portfele</p>

                <p><small>Majątek ~500.30</small> </p>
              </div>
            </Col>
            </Row>
        </Container>
    );
}
export {Home};
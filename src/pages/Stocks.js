import React, {useState, useEffect, useContext}  from 'react';
import {Container, Row} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import api from '../services/api';
import { LineChart, YAxis, CartesianGrid, XAxis, Legend, Line, Tooltip } from 'recharts';
import { TIMEDICT } from '../utils/timeUtils';
import moment from 'moment';
import bitcoin from '../img/bitcoin.png';
import {LoadChart, TinyChart} from '../components/Charts';
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage from '../components/Messages';
import AuthContext from '../context/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


const Stocks = () => {

    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllStocksData = async() =>{
        api.get(`getAllStocksData`)
        .then(response => {
            console.log(response);
            setStocks(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        })
    }


    useEffect(() => {
        getAllStocksData();
    }, []);

    return(
        <Container>
            <Row>
            {
                loading ? (
                    <center><Spinner animation="border" variant="primary" /></center>
                ) :(
                
                    <table style={{width: '100%', color: 'rgba(255, 255, 255, 0.7)'}}>
            <thead>
                <tr>
                <th>Waluta</th>
                <th>Aktualna cena</th>
                <th>Zmiana 24h</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {

                stocks.map((stock) => (
                    <tr className='line' style={{margin: '10px 0px'}}>
                    <td><img src={process.env.PUBLIC_URL + '/img/'+(stock.currency).toLowerCase() + '.png'} width="50px" style={{padding: '5px 0px'}}></img> {stock.currency}</td>
                    <td>${parseFloat(stock.prices[0].price).toFixed(2)}</td>
                    <td>
                    {(parseFloat(stock.prices[stock.prices.length-1].price) - parseFloat(stock.prices[0].price)).toFixed(2)} USD ({(parseFloat(stock.prices[0].price) / parseFloat(stock.prices[stock.prices.length-1].price)).toFixed(2)}%)
                    </td>
                    <td>
                        <div style={{width: '400px', height:'130px'}}>
                            <TinyChart data={stock.prices} dataKey="price" /> 
                        </div>
                    </td>
                    <td>
                        <button className='btnBase large'>SPRAWDŹ</button>
                    </td>
                    </tr>
                    
                ))
                }
            </tbody>
            </table>

                )
            }
            
            </Row>
        </Container>
    );
}
export {Stocks};
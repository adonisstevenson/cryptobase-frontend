import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Home} from './pages/Home';
import {Wallets} from './pages/Wallets';
import {Register} from './pages/Register';
import {Login} from './pages/Login';
import {About} from './pages/About';
import {NavBar} from './components/NavBar';
import {Helmet} from 'react-helmet';
import React, {useState, useContext, useMemo} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import { SingIn } from './pages/SingIn';
import PrivateRoute from './services/PrivateRoute';
import { Logout } from './pages/Logout';
import AnonymousRoute from './services/AnonymousRoute';
import { AlertProvider, AlertContext } from './context/AlertContext';
import { Alert } from 'react-bootstrap';
import AlertPopup from './components/AlertPopup';
import APIErrorProvider from './providers/Notifications';
import ApiErrorNotification from './components/Notification';
import { Stocks } from './pages/Stocks';

function App() {
  const [alert, setAlert] = useState(null);
  const value = useMemo(() => ({alert, setAlert}), [alert, setAlert])

  return (
    <Router>
    <div className="App">
    <Helmet>
    <title>Home</title>
    
    </Helmet>
    <AuthProvider>
    <AlertProvider value={value}>
    <NavBar />
    <AlertPopup />
      <APIErrorProvider>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/about' element={<About />}></Route>
        <Route exact path='/wallets'  element={<Wallets />}></Route>
        <Route exact path='/stocks'  element={<Stocks />}></Route>
        <Route exact path ='/' element={<AnonymousRoute/>}>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Route>

        <Route exact path ='/' element={<PrivateRoute/>}>
          <Route path='/logout' element={<Logout/>} />
        </Route>
      
      </Routes>
      <ApiErrorNotification />
      </APIErrorProvider>
    </AlertProvider>
    </AuthProvider>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
<script
  src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
  crossorigin></script>
<script
  src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
  crossorigin></script>

    </Router>
  );
}

export default App;

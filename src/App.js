import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {About} from './pages/About';
import {NavBar} from './components/NavBar';
import {Helmet} from 'react-helmet';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
    <Helmet>
    <title>Home</title>
    
    </Helmet>
    <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/about' element={<About />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
      </Routes>
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

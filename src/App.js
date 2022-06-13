import './App.css';
import 'antd/dist/antd.less';
import { useState, useEffect } from 'react';
import Dashboard from './page/dashboard';
import Login from './page/login';
import axios from 'axios'
import {BrowserRouter as Router} from "react-router-dom"
import AppRoutes from './route';

function App() {
  return (
    <div className="App">     
      <Router>
        <AppRoutes/>
      </Router>
    </div>
  );
}

export default App;

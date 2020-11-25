import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import EmployeePage from './pages/employeePage';
// import LoginForm from './pages/loginPage';
import './App.css';
import Router from './appRouting';

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;

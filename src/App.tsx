import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/header';
// import LoginForm from './pages/loginPage';
import './App.css';
import Router from './appRouting';

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;

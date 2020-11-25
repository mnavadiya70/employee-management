import React from 'react';
import EmployeePage from './pages/employeePage';
// import LoginForm from './pages/loginPage';
import './App.css';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <EmployeePage/>
    </div>
  );
}

export default App;

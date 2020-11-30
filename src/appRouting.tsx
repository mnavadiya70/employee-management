import React from 'react';
import { Route } from 'react-router-dom';
import EmployeePage from './pages/employeePage';
import CreateUpdateEmployee from './pages/createUpdateEmployee';

const routing = () => {
    return (
        <>
            <Route path="/" exact component={EmployeePage} />
            <Route path="/create" exact component={CreateUpdateEmployee} />
            <Route path="/edit/:key" exact component={CreateUpdateEmployee} />
        </>
    )
}

export default routing;
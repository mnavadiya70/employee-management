import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { IEmployeeState } from '../types/stateTypes';
import { defaultEmployee, 
    // defaultTeamMember,
    getEmployee as GetEmployee,  
    editEmployee as EditEmployee,
    addEmployee as AddEmployee } from '../api/employees';
import { IEmployeeProps } from '../types/propTypes';
import { IEmployee } from '../api/types';
// import Axios from 'axios';
import {Link} from 'react-router-dom';

import { withTranslation } from "react-i18next";
import '../langauge/configuration';
import Validation from '../validations/validationSchema';

// const teamMember: ITeamMember = defaultTeamMember;
let employee: IEmployee = defaultEmployee;

class SaveEmployee extends Component<IEmployeeProps, IEmployeeState>{
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            selectedEmployee: defaultEmployee,
            key: props.match.params.key,
            path: props.match.path
        }
    }

    componentDidMount() {
        if (this.state.key !== undefined && this.state.key !== null) {
            this.getEmployee(this.state.key);
        }
    }

    private async getEmployee(key: any) {
        // Axios.get('https://employee-management-8ebb3.firebaseio.com/employees/' + key + '.json')
        //     .then(res => {
        //         // employee.Key = key;
        //         employee.UserName = res.data.UserName;
        //         employee.FirstName = res.data.FirstName;
        //         employee.LastName = res.data.LastName;
        //         employee.Email = res.data.Email;
        //         employee.Password = res.data.Password;
        //         this.setState({ selectedEmployee: employee });
        //     })
        const emp = await GetEmployee(key);
        employee = emp;
        this.setState({ selectedEmployee: employee });
    }

    render() {
        const { t } = this.props;
        const emp = this.state.selectedEmployee;
        return (
            <Formik
                initialValues={{
                            userName: '',
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: ''
                        }}
                validationSchema={Validation}
                onSubmit={fields => {
                    employee.UserName = fields.userName;
                    employee.FirstName = fields.firstName;
                    employee.LastName = fields.lastName;
                    employee.Email = fields.email;
                    employee.Password = fields.password;
                    employee.TeamID = "";
                    const emp = JSON.stringify(employee);
                    if (this.state.path === "/edit/:key") {
                        EditEmployee(this.state.key, emp);
                        this.props.history.push("/");
                    }
                    else {
                        AddEmployee(emp);
                        this.props.history.push("/");
                    }
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="userName">{t("table.userName")}</label>
                            <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                            <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">{t("table.firstName")}</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">{t("table.lastName")}</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">{t("table.email")}</label>
                            <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">{t("table.password")}</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">{t("form.save")}</button>
                            <Link to="/">{t("form.cancel")}</Link>
                        </div>
                    </Form>
                )}
            />
        )
    }

}

export default withTranslation()(SaveEmployee);
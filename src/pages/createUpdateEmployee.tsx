import { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IEmployeeState } from '../types/stateTypes';
import { defaultEmployee, getEmployee as GetEmployee, defaultTeamMember, editEmployee as EditEmployee } from '../api/employees';
import { IEmployeeProps } from '../types/propTypes';
import { IEmployee, ITeamMember } from '../api/types';
import Axios from 'axios';

const teamMember: ITeamMember = defaultTeamMember;
const employee: IEmployee = defaultEmployee;

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

    private getEmployee(key: any) {
        Axios.get('https://employee-management-8ebb3.firebaseio.com/employees/' + key + '.json')
            .then(res => {
                // employee.Key = key;
                employee.UserName = res.data.UserName;
                employee.FirstName = res.data.FirstName;
                employee.LastName = res.data.LastName;
                employee.Email = res.data.Email;
                employee.Password = res.data.Password;
                this.setState({ selectedEmployee: employee });
            })
        // const employee = await GetEmployee(key);

    }

    render() {
        const emp = this.state.selectedEmployee;
        return (
            <Formik
                initialValues={
                    this.state.path !== "/create/:key"
                        ? {
                            userName: emp.UserName,
                            firstName: emp.FirstName,
                            lastName: emp.LastName,
                            email: emp.Email,
                            password: emp.Password
                        }
                        : {
                            userName: '',
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: ''
                        }}
                validationSchema={Yup.object().shape({
                    userName: Yup.string()
                        .required('UserName is required'),
                    firstName: Yup.string()
                        .required('FirstName is required'),
                    lastName: Yup.string()
                        .required('LastName is required'),
                    email: Yup.string()
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required')
                })}
                onSubmit={fields => {
                    if (this.state.path === "/create/:key") {
                        teamMember.Password = fields.password;
                        teamMember.LastName = fields.lastName;
                        teamMember.FirstName = fields.firstName;
                        teamMember.UserName = fields.userName;
                        teamMember.Email = fields.email;
                        teamMember.TeamId = this.state.key;

                        const teammember = JSON.stringify(teamMember);
                        Axios.post('https://employee-management-8ebb3.firebaseio.com/TeamMembers.json', teammember )
                        .then(res => {
                            alert('SUCCESS : team member saved successfully')
                            this.props.history.push("/")
                        })
                    }
                    else {
                        employee.UserName = fields.userName;
                        employee.FirstName = fields.firstName;
                        employee.LastName = fields.lastName;
                        employee.Email = fields.email;
                        employee.Password = fields.password;

                        const emp = JSON.stringify(employee);
                        EditEmployee(this.state.key, emp);
                        this.props.history.push("/")
                    }
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="userName">Username</label>
                            <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                            <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">Firstname</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Lastname</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Save</button>
                        </div>
                    </Form>
                )}
            />
        )
    }

}

export default SaveEmployee;
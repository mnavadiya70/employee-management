import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { Component } from 'react';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';

class LoginForm extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                    userName: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    userName: Yup.string()
                        .required('UserName is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required')
                })}
                onSubmit={fields => {
                    alert('SUCCESS : You are logged in!!')
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="userName">User Name</label>
                            <Field name="userName" type="text" className={'form-control' + (errors.userName && touched.userName ? ' is-invalid' : '')} />
                            <ErrorMessage name="userName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Login</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                )}
            />
        );
    }
}


export default LoginForm;
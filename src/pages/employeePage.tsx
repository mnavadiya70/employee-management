import React, { Component } from 'react';
import * as ReactStrap from "reactstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import { employees as GetEmployees, deleteEmployee as DeleteEmployee } from '../api/employees';

import { IEmployeeProps } from '../types/propTypes';
import { IEmployeeState } from '../types/stateTypes';
import { IEmployee } from '../api/types';

class EmployeePage extends Component<IEmployeeProps, IEmployeeState> {
    // list: IEmployee[] = [];
    private list: IEmployee[] = [];
    // list: any;

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }

    private async getEmployees() {
        const data = await GetEmployees();
        this.list = data;
        this.setState({ employees: this.list });
    }

    componentDidMount() {
        this.getEmployees();
    }

    private async EditEmployee(cell: any, row: any, rowIndex: number) {
        debugger;
        console.log(row);
    }

    private async DeleteEmployee(cell: any, row: any, rowIndex: number) {
        debugger;
        await DeleteEmployee(row.Key);
        let list = this.list;
        this.list = list.filter(emp => emp.Key !== row.Key);
        this.setState({employees:this.list});
        // console.log(row);
    }

    private buttons(cell: any, row: any, rowIndex: number) {
        return (
            <div>
                <ReactStrap.Button
                    className="btn btn-primary btn-xs"
                onClick={() => this.EditEmployee(cell, row, rowIndex)}
                >
                    Edit
                </ReactStrap.Button>{" "}
                <ReactStrap.Button
                    className="btn btn-danger btn-xs"
                    onClick={() => this.DeleteEmployee(cell, row, rowIndex)}
                >
                    Delete
                </ReactStrap.Button>
            </div>
        );
    }

    render() {
        const options = {
            page: 1,
            sizePerPage: 5,
            pageStartIndex: 1,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
        };
        return (
            <ReactStrap.CardBody>
                <BootstrapTable
                    data={this.state.employees}
                    hover={true}
                    search
                    // multiColumnSearch
                    pagination
                    options={options}>
                    <TableHeaderColumn dataField='Key' isKey={true} dataSort={true} hidden={true}>Key</TableHeaderColumn>
                    <TableHeaderColumn dataField='UserName' dataSort={true} >UserName</TableHeaderColumn>
                    <TableHeaderColumn dataField='FirstName' dataSort={true}>FirstName</TableHeaderColumn>
                    <TableHeaderColumn dataField='LastName' dataSort={true}>LastName</TableHeaderColumn>
                    <TableHeaderColumn dataField='Email' dataSort={true}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='Password' dataSort={true}>Password</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.buttons.bind(this)}></TableHeaderColumn>
                </BootstrapTable>
            </ReactStrap.CardBody>
        );
    }

}

export default EmployeePage;
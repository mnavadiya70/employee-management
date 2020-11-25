import { FaPencilAlt, FaTrash, FaPlus, FaEye } from "react-icons/fa";
import React, { Component } from 'react';
import * as ReactStrap from "reactstrap";
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import {
    employees as GetEmployees,
    deleteEmployee as DeleteEmployee,
    getTeamMembers as GetTeamMembers,
    // getEmployee as GetEmployee
} from '../api/employees';
import Modal from '../components/modal';
import { IEmployeeProps } from '../types/propTypes';
import { IEmployeeState } from '../types/stateTypes';
import { IEmployee, ITeamMember } from '../api/types';
import { defaultEmployee } from '../api/employees';

class EmployeePage extends Component<IEmployeeProps, IEmployeeState> {
    private list: IEmployee[] = [];
    private teamMembers: ITeamMember[] = [];

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            teamMembers: [],
            selectedEmployee: defaultEmployee,
            path: '',
            key: '',
            showModel: false
        }
    }

    private async getEmployeesAndTeamMembers() {
        const data = await GetEmployees();
        this.list = data;
        const members = await GetTeamMembers();
        this.teamMembers = members;
        this.setState({ employees: this.list, teamMembers: this.teamMembers  });
    }

    componentDidMount() {
        this.getEmployeesAndTeamMembers();
    }

    // private async EditEmployee(cell: any, row: any, rowIndex: number) {
    //     let emp = await GetEmployee(row.Key);
    //     let emp = row;
    //     this.setState({ selectedEmployee: row });
    //     console.log(emp);
    //     console.log(row);
    // }

    private async GetTeamMembers(key: any){
        let data = this.teamMembers;
        data = data.filter(member => member.TeamId === key)
        // this.teamMember = data;     
        // console.log(data);
        this.setState({
            teamMembers: data,
            showModel: true
        })
    }

    private async DeleteEmployee(cell: any, row: any, rowIndex: number) {
        if(window.confirm("are you sure you want to delete this employee?")){
            await DeleteEmployee(row.Key);
            let list = this.list;
            this.list = list.filter(emp => emp.Key !== row.Key);
            this.setState({ employees: this.list });
        }
    }

    modelCloseHandler = () => {
        this.setState({
            showModel: false,
            teamMembers: []
        })
    }
    
    private buttons(cell: any, row: any, rowIndex: number) {
        return (
            <div>
                <ReactStrap.Button onClick={() => this.GetTeamMembers(row.Key)}>
                   <FaEye/>
                </ReactStrap.Button>
                <Link to={`/create/${row.Key}`}><FaPlus/></Link>{" "}
                <Link to={`/edit/${row.Key}`}><FaPencilAlt /></Link>{" "}
                {/* <ReactStrap.Button
                    className="btn btn-primary btn-xs"
                    onClick={() => this.EditEmployee(cell, row, rowIndex)}
                >
                    Edit
                </ReactStrap.Button>{" "} */}
                <ReactStrap.Button
                    onClick={() => this.DeleteEmployee(cell, row, rowIndex)}>
                   <FaTrash/>
                </ReactStrap.Button>
            </div>
        );
    }

    render() {
        const options = {
            page: 1,
            // sizePerPage: 5,
            // pageStartIndex: 1,
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
                    options={options}
                >
                    <TableHeaderColumn dataField='Key' isKey={true} dataSort={true} hidden={true}>Key</TableHeaderColumn>
                    <TableHeaderColumn dataField='UserName' dataSort={true} >UserName</TableHeaderColumn>
                    <TableHeaderColumn dataField='FirstName' dataSort={true}>FirstName</TableHeaderColumn>
                    <TableHeaderColumn dataField='LastName' dataSort={true}>LastName</TableHeaderColumn>
                    <TableHeaderColumn dataField='Email' dataSort={true}>Email</TableHeaderColumn>
                    <TableHeaderColumn dataField='Password' dataSort={true}>Password</TableHeaderColumn>
                    <TableHeaderColumn dataField='button' dataFormat={this.buttons.bind(this)}></TableHeaderColumn>
                </BootstrapTable>
                <Modal members={this.state.teamMembers} show={this.state.showModel} modelClosed={this.modelCloseHandler}/>
                    {/* {this.teamMembers.length > 0 ? this.teamMembers : "No team members found"} */}
            </ReactStrap.CardBody>
        );
    }

}

export default EmployeePage;
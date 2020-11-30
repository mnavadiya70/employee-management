import { FaPencilAlt, FaTrash, FaEye } from "react-icons/fa";
import React, { Component } from 'react';
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';
import * as ReactStrap from "reactstrap";
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withTranslation } from "react-i18next";
// import i18next from 'i18next';

// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import {
    employees as GetEmployees,
    deleteEmployee as DeleteEmployee,
    editEmployee as EditEmployee,
    // getEmployee as GetEmployee
} from '../api/employees';
import Modal from '../components/modal';
import { IEmployeeProps } from '../types/propTypes';
import { IEmployeeState } from '../types/stateTypes';
import { IEmployee, ITeamMember } from '../api/types';
import { defaultEmployee } from '../api/employees';
// import '../langauge/configuration';
import '../assets/styles/main.css';

class EmployeePage extends Component<IEmployeeProps, IEmployeeState> {
    private list: IEmployee[] = [];

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            teamMembers: [],
            selectedEmployee: defaultEmployee,
            path: '',
            key: '',
            showModel: false,
            selectedData: [],
            notTeamMembers: []
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

    private async GetTeamMembers(key: any) {
        let data = this.list;
        data = data.filter(member => member.TeamID === key);

        let notAssignedToAnyTeam = this.list.filter(member => member.TeamID === "");
        let notTeamMembers = [];
        if (notAssignedToAnyTeam.length > 0 && notAssignedToAnyTeam !== null) {
            for (let i = 0; i < notAssignedToAnyTeam.length; i++) {
                notTeamMembers.push({ UserName: notAssignedToAnyTeam[i].UserName, Key: key });
            }
        }

        this.setState({
            teamMembers: data,
            showModel: true,
            notTeamMembers: notTeamMembers
        })
    }

    private async DeleteEmployee(cell: any, row: any, rowIndex: number) {
        if (window.confirm("are you sure you want to delete this employee?")) {
            await DeleteEmployee(row.Key);
            let list = this.list;
            this.list = list.filter(emp => emp.Key !== row.Key);
            let teamMemberToRemove = list.filter(emp => emp.TeamID === row.Key);
            if (teamMemberToRemove !== null && teamMemberToRemove.length > 0) {
                for (let i = 0; i < teamMemberToRemove.length; i++) {
                    teamMemberToRemove[i].TeamID = "";
                    EditEmployee(teamMemberToRemove[i].Key, JSON.stringify(teamMemberToRemove[i]));
                }
            }

            this.setState({ employees: this.list });
        }
    }

    modelCloseHandler = () => {
        this.setState({
            showModel: false,
            teamMembers: []
        })
    }

    // showHideHandler = (e) => {
    //     console.log(e.target.value);
    //     // let rootElement = document.getElementById('root');
    //     // let item = rootElement.getElementsByTagName('tr');
    //     // document.querySelector('data-field').value;
    //     // console.log(item);
    // }

    // languageChangeHandler = (e) => {
    //     console.log(e.target.value);
    //     i18next.changeLanguage(e.target.value);
    // }

    private buttons(cell: any, row: any, rowIndex: number) {
        return (
            <div>
                <ReactStrap.Button className="btn btn-info"
                    onClick={() => this.GetTeamMembers(row.Key)}>
                    <FaEye />
                </ReactStrap.Button>{" "}
                {/* <Link className="btn btn-success" to={`/create/${row.Key}`}><FaPlus /></Link>{" "} */}
                <Link className="btn btn-warning" to={`/edit/${row.Key}`}><FaPencilAlt /></Link>{" "}
                <ReactStrap.Button className="btn btn-danger"
                    onClick={() => this.DeleteEmployee(cell, row, rowIndex)}>
                    <FaTrash />
                </ReactStrap.Button>
            </div>
        );
    }

    getSelectedRowKeys() {
        //Here is your answer
        console.log(this.refs.table.state.selectedRowKeys);
        let selectedRows = this.refs.table.state.selectedRowKeys;
        let data = this.state.employees;
        data = data.filter(emp => selectedRows.includes(emp.Key))
        this.setState({ selectedData: data });
        console.log(data);
    }

    onSelectColumns = (selectedList, selectedItem) => {
        let data = this.list;
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < selectedList.length; j++) {
                if (data[i].UserName === selectedList[j].UserName) {
                    data[i].TeamID = selectedList[j].Key;
                }
            }
        }

        let team = data.filter(emp => emp.TeamID === selectedItem.Key);
        this.setState({
            teamMembers: team
        });

        if (team !== null && team.length > 0) {
            for (let m = 0; m < team.length; m++) {
                EditEmployee(team[m].Key, JSON.stringify(team[m]));
            }
        }
    }

    onRemoveColumns = (selectedList, removedItem) => {
        debugger;
        let data = this.list;
        for (let i = 0; i < data.length; i++) {
            if (data[i].UserName === removedItem.UserName) {
                data[i].TeamID = "";
            }
        }

        let team = data.filter(emp => emp.TeamID === removedItem.Key);
        this.setState({
            teamMembers: team
        });

        if (team !== null && team.length > 0) {
            for (let m = 0; m < team.length; m++) {
                EditEmployee(team[m].Key, JSON.stringify(team[m]));
            }
        }
    }

    render() {
        const { t } = this.props;
        const options = {
            page: 1,
            sizePerPage: 5,
            // pageStartIndex: 1,
            paginationSize: 2,
            sizePerPageList: [5, 10, 15, 20],
            prePage: t("pagination.prev"),
            nextPage: t("pagination.next"),
            firstPage: t("pagination.first"),
            lastPage: t("pagination.last")
        };

        // const selectRowProp = {
        //     mode: 'checkbox',
        //     bgColor: 'gray', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
        //     // hideSelectColumn: false,  // enable hide selection column.
        //     clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
        //     onSelect: (row) => {
        //         console.log(row);
        //         // this.getSelectedRowKeys()
        //     },
        //     onSelectAll: (currentSelectedAndDisplayData) => {
        //         console.log(currentSelectedAndDisplayData);
        //     }
        // };
        return (
            <>
                {/* <button className="btn btn-success react-bs-table-csv-btn hidden-print" onClick={() => this.getSelectedRowKeys()}>{t("page.getExportData")}</button>{" "}
                <CSVLink className="btn btn-success react-bs-table-csv-btn hidden-print" data={this.state.selectedData} fileName="selected-employee.csv">{t("page.exportData")}</CSVLink>{" "} */}
                {/* <ReactStrap.CardBody> */}

                    <Link className="btn btn-success" to="/create">Add Employee</Link>{" "}
                    <BootstrapTable
                        data={this.state.employees}
                        hover={true}
                        search
                        // insertRow={true}
                        // exportCSV={true}
                        // csvFileName="employee.csv"
                        // multiColumnSearch
                        pagination
                        options={options}
                        // columnFilter
                        searchPlaceholder={t("table.search")}
                        // selectRow={selectRowProp}
                        ref='table'
                        className="container"
                    >
                        <TableHeaderColumn dataField='Key' isKey={true} dataSort={true} hidden={true}>{t("table.key")}</TableHeaderColumn>
                        <TableHeaderColumn dataField='UserName' dataSort={true} >{t("table.userName")}</TableHeaderColumn>
                        <TableHeaderColumn dataField='FirstName' dataSort={true}>{t("table.firstName")}</TableHeaderColumn>
                        <TableHeaderColumn dataField='LastName' dataSort={true}>{t("table.lastName")}</TableHeaderColumn>
                        <TableHeaderColumn dataField='Email' dataSort={true}>{t("table.email")}</TableHeaderColumn>
                        <TableHeaderColumn dataField='Password' dataSort={true}>{t("table.password")}</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.buttons.bind(this)}></TableHeaderColumn>
                    </BootstrapTable>
                    <Modal
                        noTeamMembers={this.state.notTeamMembers}
                        members={this.state.teamMembers}
                        show={this.state.showModel}
                        click={this.modelCloseHandler}
                        onSelectColumns={this.onSelectColumns}
                        onRemoveColumns={this.onRemoveColumns} />
                {/* </ReactStrap.CardBody> */}
            </>
        );
    }

}

export default withTranslation()(EmployeePage);
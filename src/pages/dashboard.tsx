import Grid from '@material-ui/core/Grid'
import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardBody from '../components/Card/CardBody';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
  editEmployee as EditEmployee,
  deleteEmployee as DeleteEmployee,
  addEmployee as AddEmployee
} from '../api/employees';
import { env } from '../environments/environment';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function TableList() {
  const [t, i18n] = useTranslation();
  const re = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  // const { classes } = props;
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const columns = [
    { field: 'Key', title: 'Key', hidden: true },
    { field: 'FirstName', title: t("table.firstName") },
    { field: 'LastName', title: t("table.lastName") },
    { field: 'UserName', title: t("table.userName") },
    { field: 'Email', title: t("table.email") },
    { field: 'Password', title: t("table.password") }
  ];

  useEffect(() => {
    axios.get(env.BASE_API + 'employees.json')
      .then(res => {
        const employees = Object.keys(res.data)
        const list = employees.map(key => {
          const emp = res.data[key]
          return {
            Key: key,
            FirstName: emp.FirstName,
            UserName: emp.UserName,
            Email: emp.Email,
            Password: emp.Password,
            LastName: emp.LastName,
            TeamID: emp.TeamID,
          }
        });
        setData(list);
      })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.FirstName === undefined) {
      errorList.push(t("table.firstName") + t("validation.isRequired"))
    }
    if (newData.LastName === undefined) {
      errorList.push(t("table.lastName") + t("validation.isRequired"))
    }
    if (newData.Email === undefined) {
      errorList.push(t("table.email") + t("validation.isRequired"))
    }
    if (newData.Email !== undefined && re.test(String(newData.Email).toLowerCase()) === false) {
      errorList.push(t("validation.validEmail"))
    }
    if (newData.UserName === undefined) {
      errorList.push(t("table.userName") + t("validation.isRequired"))
    }
    if (newData.Password === undefined) {
      errorList.push(t("table.password") + t("validation.isRequired"))
    }
    if (newData.Password !== undefined && newData.Password.length < 8) {
      errorList.push(t("validation.passwordLength"))
    }
    if (errorList.length < 1) {
      EditEmployee(newData.Key, newData);
      const dataUpdate = [...data];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setData([...dataUpdate]);
      resolve()
      setIserror(false)
      setErrorMessages([])
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = []
    if (newData.FirstName === undefined) {
      errorList.push(t("table.firstName") + t("validation.isRequired"))
    }
    if (newData.LastName === undefined) {
      errorList.push(t("table.lastName") + t("validation.isRequired"))
    }
    if (newData.Email === undefined) {
      errorList.push(t("table.email") + t("validation.isRequired"))
    }
    if (newData.Email !== undefined && re.test(String(newData.Email).toLowerCase()) === false) {
      errorList.push(t("validation.validEmail"))
    }
    if (newData.UserName === undefined) {
      errorList.push(t("table.userName") + t("validation.isRequired"))
    }
    if (newData.Password === undefined) {
      errorList.push(t("table.password") + t("validation.isRequired"))
    }
    if (newData.Password !== undefined && newData.Password.length < 8) {
      errorList.push(t("validation.passwordLength"))
    }
    if (errorList.length < 1) {
      AddEmployee(newData);
      let dataToAdd = [...data];
      dataToAdd.push(newData);
      setData(dataToAdd);
      resolve()
      setErrorMessages([])
      setIserror(false)
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowDelete = (oldData, resolve) => {
    DeleteEmployee(oldData.Key);
    const dataDelete = [...data];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    setData([...dataDelete]);
    resolve()
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={12}>
          <div>
            {iserror &&
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>
                })}
              </Alert>
            }
          </div>
          <Card>
            <CardHeader color="primary">
              <h4>{t("dashboard.EmployeeManagement")}</h4>
            </CardHeader>
            <CardBody>
              <MaterialTable
                data={data}
                columns={columns}
                icons={tableIcons}
                title=""
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);
                    }),
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      handleRowAdd(newData, resolve)
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      handleRowDelete(oldData, resolve)
                    }),
                }} />
            </CardBody>
          </Card>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid></>
  );
}

export default TableList;

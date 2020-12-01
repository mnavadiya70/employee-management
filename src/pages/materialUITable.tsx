import Grid from '@material-ui/core/Grid'
import React, { useState, useEffect } from 'react';
// @material-ui/core components
// import withStyles from '@material-ui/core/styles/withStyles';
// // core components
// import GridItem from '../components/Grid/GridItem';
// import GridContainer from '../components/Grid/GridContainer';
// // import Table from '../components/Table/Table';
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader';
import CardBody from '../components/Card/CardBody';
// // import { createStyles } from '@material-ui/core';
// import { DataGrid, ColDef } from '@material-ui/data-grid';
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
import { createStyles } from '@material-ui/core';

// const styles = createStyles({
//   cardCategoryWhite: {
//     '&,& a,& a:hover,& a:focus': {
//       color: 'rgba(255,255,255,.62)',
//       margin: '0',
//       fontSize: '14px',
//       marginTop: '0',
//       marginBottom: '0'
//     },
//     '& a,& a:hover,& a:focus': {
//       color: '#FFFFFF'
//     }
//   },
//   cardTitleWhite: {
//     color: '#FFFFFF',
//     marginTop: '0px',
//     minHeight: 'auto',
//     fontWeight: 300,
//     fontFamily: '\'Roboto\', \'Helvetica\', \'Arial\', sans-serif',
//     marginBottom: '3px',
//     textDecoration: 'none',
//     '& small': {
//       color: '#777',
//       fontSize: '65%',
//       fontWeight: 400,
//       lineHeight: 1
//     }
//   }
// });

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

const columns = [
  { field: 'Key', title: 'Key', hidden: true },
  { field: 'FirstName', title: 'First name' },
  { field: 'LastName', title: 'Last name' },
  { field: 'UserName', title: 'User name' },
  { field: 'Email', title: 'Email' },
  { field: 'Password', title: 'Password' },
  { field: 'TeamID', title: 'TeamID' }
];


function TableList(props: any) {
  // const { classes } = props;
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    axios.get('https://employee-management-8ebb3.firebaseio.com/TeamMembers.json')
      .then(res => {
        const employees = Object.keys(res.data)
        // console.log(employees);
        const testData = employees.map(key => {
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
        setData(testData);
      })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (errorList.length < 1) {
      axios.patch("https://employee-management-8ebb3.firebaseio.com/TeamMembers/" + newData.Key + ".json", newData)
        .then(res => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()
        })
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
      errorList.push("Please enter first name")
    }
    if (newData.LastName === undefined) {
      errorList.push("Please enter last name")
    }
    if (newData.Email === undefined) {
      errorList.push("Please enter a valid email")
    }
    if (newData.UserName === undefined) {
      errorList.push("Please enter a valid username")
    }
    if (newData.Password === undefined) {
      errorList.push("Please enter a valid password")
    }
    if (errorList.length < 1) { //no error
      axios.post("https://employee-management-8ebb3.firebaseio.com/TeamMembers.json", newData)
        .then(res => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowDelete = (oldData, resolve) => {
    axios.delete("https://employee-management-8ebb3.firebaseio.com/TeamMembers/" + oldData.Key + ".json")
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
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
            <h4>Employee Management</h4>
          </CardHeader>
          <CardBody>
            <MaterialTable
              data={data}
              columns={columns}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    // this.UpdateData(newData);
                    console.log(newData);
                    console.log(oldData);
                    console.log(resolve);
                    handleRowUpdate(newData, oldData, resolve);
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    console.log(newData);
                    console.log(resolve);
                    handleRowAdd(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    console.log(oldData);
                    console.log(resolve);
                    handleRowDelete(oldData, resolve)
                  }),
              }} />
          </CardBody>
        </Card>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}

export default TableList;

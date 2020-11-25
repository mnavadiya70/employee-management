import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import '../assets/styles/main.css';
import Popup from '../components/popup';
const modal = (props) => {
    return (
        <>
            <Popup show={props.show} clicked={props.modelClosed}></Popup>
            <div className="modal"
            >
                {
                    props.members.length > 0
                        ?
                        <BootstrapTable data={props.members}>
                            <TableHeaderColumn dataField='TableId' isKey={true} dataSort={true} hidden={true}>Key</TableHeaderColumn>
                            <TableHeaderColumn dataField='UserName' dataSort={true}>UserName</TableHeaderColumn>
                            <TableHeaderColumn dataField='FirstName' dataSort={true}>FirstName</TableHeaderColumn>
                            <TableHeaderColumn dataField='LastName' dataSort={true}>lastname</TableHeaderColumn>
                            <TableHeaderColumn dataField='Email' dataSort={true}>Email</TableHeaderColumn>
                            <TableHeaderColumn dataField='Password' dataSort={true}>Password</TableHeaderColumn>
                        </BootstrapTable>
                        : "No Team members found"
                }

            </div>
        </>
    )
}

export default modal;
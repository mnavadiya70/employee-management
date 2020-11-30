import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withTranslation } from "react-i18next";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

import 'bootstrap/dist/css/bootstrap.css';
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import '../langauge/configuration';
// import '../assets/styles/main.css';
const modal = (props) => {
    // function onSelectColumns (selectedList, selectedItem){
        
    //     console.log(selectedItem);
    //     console.log(selectedList);
    // }

    // function onRemoveColumns(selectedList, removedItem) {
    //     console.log(selectedList);
    //     console.log(removedItem);
    // }

    const {t} = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("modal.title")}
                    </Modal.Title>
            </Modal.Header>
            <Multiselect
                    options={props.noTeamMembers} // Options to display in the dropdown
                    // selectedValues={this.state.selectedColumns} // Preselected value to persist in dropdown
                    onSelect={props.onSelectColumns} // Function will trigger on select event
                    onRemove={props.onRemoveColumns} // Function will trigger on remove event
                    displayValue="UserName" // Property name to display in the dropdown options
                />
                {/* {
                    props.noTeamMembers.map(emp => {
                        return <p>{emp}</p>
                    })
                } */}
            <Modal.Body >
                {
                    props.members.length > 0
                        ?
                        <BootstrapTable data={props.members}>
                            <TableHeaderColumn dataField='TableId' isKey={true} dataSort={true} hidden={true}>{t("table.key")}</TableHeaderColumn>
                            <TableHeaderColumn dataField='UserName' dataSort={true}>{t("table.userName")}</TableHeaderColumn>
                            <TableHeaderColumn dataField='FirstName' dataSort={true}>{t("table.firstName")}</TableHeaderColumn>
                            <TableHeaderColumn dataField='LastName' dataSort={true}>{t("table.lastName")}</TableHeaderColumn>
                            <TableHeaderColumn dataField='Email' dataSort={true}>{t("table.email")}</TableHeaderColumn>
                            <TableHeaderColumn dataField='Password' dataSort={true}>{t("table.password")}</TableHeaderColumn>
                        </BootstrapTable>
                        : t("modal.noTeamMemberFound")
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.click}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default withTranslation()(modal);
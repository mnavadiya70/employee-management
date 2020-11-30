import React from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { withTranslation } from "react-i18next";
import {Table} from 'react-bootstrap'

import '../langauge/configuration';

const modal = (props) => {
    const { t } = props;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("modal.title")}
                </Modal.Title>
            </Modal.Header><br />

            <Modal.Body>
                <div className="row">
                    <p>{t("modal.para")}</p>
                    <Multiselect
                        options={props.noTeamMembers}
                        onSelect={props.onSelectColumns}
                        onRemove={props.onRemoveColumns}
                        displayValue="UserName"
                    />
                </div>
                <br/>
                {
                    props.members.length > 0
                        ?
                        <div className="container">
                            <div className="row">
                                <Table responsive striped bordered hover>
                                    <thead className="thead-light">
                                        <tr style={{fontWeight: "bold"}}>
                                            <td hidden={true}>{t("table.key")}</td>
                                            <td>{t("table.userName")}</td>
                                            <td >{t("table.firstName")}</td>
                                            <td>{t("table.lastName")}</td>
                                            <td>{t("table.email")}</td>
                                            <td>{t("table.password")}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.members.map(member => {
                                                return (
                                                    <tr key={member.key}>
                                                        <td hidden={true}>{member.Key}</td>
                                                        <td>{member.UserName}</td>
                                                        <td>{member.FirstName}</td>
                                                        <td>{member.LastName}</td>
                                                        <td>{member.Email}</td>
                                                        <td>{member.Password}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        : <div className="row">{t("modal.noTeamMemberFound")}</div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.click}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default withTranslation()(modal);
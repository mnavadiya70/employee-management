import { ITeamMember } from './../api/types';
import { IEmployee } from "../api/types";

export interface IEmployeeState {
    employees: IEmployee[];
    teamMembers: ITeamMember[];
    selectedEmployee: IEmployee;
    key: any;
    path: any;
    showModel: boolean;
}
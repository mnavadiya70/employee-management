import { IEmployee, ITeamMember } from './types';
import request from '../utils/request'

export const defaultEmployee: IEmployee = {
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
}

export const defaultTeamMember: ITeamMember = {
    TeamId: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
}

export const employees = () =>
    request({
        url: '/employees.json',
        method: 'get'
    }).then(response => {
        const employees = Object.keys(response.data)
        return employees.map(key => {
            const employee = response.data[key]
            return {
                Key: key,
                FirstName: employee.FirstName,
                UserName: employee.UserName,
                Email: employee.Email,
                Password: employee.Password,
                LastName: employee.LastName
            }
        });
    })

export const getTeamMembers = () =>
    request({
        url: '/TeamMembers.json',
        method: 'get'
    }).then(response => {
        const employees = Object.keys(response.data)
        return employees.map(key => {
            const member = response.data[key]
            return {
                TeamId: member.TeamId,
                FirstName: member.FirstName,
                UserName: member.UserName,
                Email: member.Email,
                Password: member.Password,
                LastName: member.LastName
            }
        });
    });


export const getEmployee = (key: any) => {
    request({
        url: '/employees/' + key + '.json',
        method: 'get'
    }).then(res => {
        // if(res.data !== null){
        return {
            Key: key,
            Password: res.data.Password,
            UserName: res.data.UserName,
            FirstName: res.data.FirstName,
            LastName: res.data.LastName,
            Email: res.data.Email
        }
        // }
        // else{
        //     return "Employee not found";
        // }
    });
}

export const deleteEmployee = (key: any) => {
    request({
        url: '/employees/' + key + '.json',
        method: 'delete'
    }).then(res => console.log(res));
}

export const editEmployee = (key: any, data: any) => {
    request({
        url: '/employees/' + key + '.json',
        method: 'put',
        data
    }).then(res => console.log(res));
}
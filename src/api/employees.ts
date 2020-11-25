import request from '../utils/request'

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

export const deleteEmployee = (key: any) => {
    debugger;
    request({
        url: '/employees/' + key + '.json',
        method: 'delete'
    }).then(res => console.log(res));
}

import {createContext, useEffect, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext = createContext()

const EmployeeContextProvider  = (props) => {

    const [employees, setEmployees] = useState([
        {id:uuidv4(), name: 'sara ahmed', email: 'saraahmed@mail.com', address: 'Egypt , cairo', phone: '01013343798'},
        {id:uuidv4(), name: 'ola Mohamed', email: 'ola@mail.com', address: 'Egypt , Alex', phone: '04823897645'},
        {id:uuidv4(), name: 'Hend ali', email: 'hendali@mail.com', address: 'Egypt , Alex', phone: '01012278799'},
        {id:uuidv4(), name: 'ahmed ali', email: 'ahmedali@mail.com', address: 'Egypt , alex', phone: 'oman'},
        {id:uuidv4(), name: 'Martin youssef', email: 'martin@mail.com', address: 'Turin, Italy', phone: '(480) 631-2097'},
])

useEffect(()=> {
    setEmployees(JSON.parse(localStorage.getItem('employees')))
},[])

useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
})



const sortedEmployees = employees?.sort((a,b)=>(a.name < b.name ? -1 : 1));



const addEmployee = (name, email, address, phone) => {
    setEmployees([...employees , {id:uuidv4(), name, email, address, phone}])
}

const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id))
}

const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map((employee) => employee.id === id ? updatedEmployee : employee))
}

    return (
        <EmployeeContext.Provider value={{sortedEmployees, addEmployee, deleteEmployee, updateEmployee}}>
            {props.children}
        </EmployeeContext.Provider>
    )
}

export default EmployeeContextProvider;
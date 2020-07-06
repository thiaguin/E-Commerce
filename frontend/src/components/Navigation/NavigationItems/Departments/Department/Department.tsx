import React from 'react'
import classes from './Department.module.css'

const department = (props) => {
    const className = props.isLast ? classes.DepartmentLast : classes.Department
    const value = { query: { department: props.element.id }, name: props.element.name }
    return (
        <div onClick={() => props.click(value)} className={className}>
            {props.element.name}
        </div>
    )
}

export default department

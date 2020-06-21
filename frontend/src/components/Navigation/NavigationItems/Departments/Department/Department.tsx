import React from 'react'
import classes from './Department.module.css'

const department = (props) => {
    const className = props.isLast ? classes.DepartmentLast : classes.Department
    return (
        <div onClick={() => props.click({ department: props.element.id })} className={className}>
            {props.element.name}
        </div>
    )
}

export default department

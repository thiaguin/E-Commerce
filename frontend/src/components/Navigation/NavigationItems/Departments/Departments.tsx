import React from 'react'
import { connect } from 'react-redux'
import classes from './Departments.module.css'
import Department from './Department/Department'

const departments = (props) => {
    const { width, margin } = props.size

    let allDepartments: null | React.HTMLElement = null

    const { departmentList } = props.navigation.departments

    const departments = departmentList.map((element, index) => {
        return <Department element={element} isLast={index === departmentList.length - 1} key={index} />
    })

    if (props.show) {
        allDepartments = (
            <div
                onMouseEnter={props.enter}
                onMouseLeave={props.leave}
                style={{ width: width, marginLeft: margin }}
                className={classes.Departments}
            >
                {departments}
            </div>
        )
    }

    return allDepartments
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
    }
}

export default connect(mapStateToProps)(departments)

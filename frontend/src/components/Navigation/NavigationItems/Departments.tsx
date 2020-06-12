import React from 'react'
import classes from './Departments.module.css'

const departments = (props) => {
    const { width, margin } = props.size

    let departments: null | React.HTMLElement = null

    if (props.show) {
        departments = (
            <div
                onMouseEnter={props.enter}
                onMouseLeave={props.leave}
                style={{ width, marginLeft: margin }}
                className={classes.Departments}
            >
                <div className="abc">abc</div>
                <div className="abc">cba</div>
            </div>
        )
    }

    return departments
}

export default departments

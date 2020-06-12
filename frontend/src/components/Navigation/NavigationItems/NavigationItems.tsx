import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
import menuSvg from '../../../assets/menu.svg'
import menuHoverSvg from '../../../assets/menuHover.svg'
import Departments from './Departments'
import Aux from '../../hoc/Aux'

const NavigationItems = (props) => {
    const { allDepartments, categories } = props.navigation
    const [departmentsHovered, setDepartmentsHovered] = useState(false)
    const [showDepartment, setShowDepartment] = useState(false)
    const ref = useRef(null)

    const [departmentSize, setDepartmentSize] = useState({ width: 0, margin: 0 })

    const icon = departmentsHovered ? menuHoverSvg : menuSvg

    const items = categories.map((element, index) => <NavigationItem item={element} key={index} />)

    const enterItemHandler = () => {
        setDepartmentsHovered(true)
    }

    const leaveItemHandler = () => {
        if (!showDepartment) {
            setDepartmentsHovered(false)
        }
    }

    const showDepartments = () => {
        setShowDepartment(true)
    }

    const hiddeDepartments = () => {
        setShowDepartment(false)
    }

    console.log(showDepartment)
    useEffect(() => {
        const width = ref.current.offsetWidth
        const margin = ref.current.getBoundingClientRect()
        setDepartmentSize({ width, margin: margin.x })
    }, [ref])

    return (
        <Aux>
            <div className={classes.NavigationItems}>
                <NavigationItem
                    reference={ref}
                    item={allDepartments}
                    icon={icon}
                    enter={enterItemHandler}
                    leave={leaveItemHandler}
                />
                {items}
            </div>
            <Departments
                show={showDepartment || departmentsHovered}
                size={departmentSize}
                enter={showDepartments}
                leave={hiddeDepartments}
            />
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
    }
}

export default connect(mapStateToProps)(NavigationItems)

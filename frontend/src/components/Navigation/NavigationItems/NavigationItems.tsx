import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import NavigationItem from './NavigationItem/NavigationItem'
import NavigationMultipleItem from './NavigationMultipleItem/NavigationMultipleItem'
import classes from './NavigationItems.module.css'
import menuSvg from '../../../assets/menu.svg'
import menuHoverSvg from '../../../assets/menuHover.svg'
import Departments from './Departments/Departments'
import Aux from '../../hoc/Aux'

const NavigationItems = (props) => {
    const { departments, categories } = props.navigation
    const [departmentsHovered, setDepartmentsHovered] = useState(false)
    const [showDepartment, setShowDepartment] = useState(false)
    const [departmentSize, setDepartmentSize] = useState({ width: 0, margin: 0 })

    const ref = useRef(null)

    const icon = showDepartment || departmentsHovered ? menuHoverSvg : menuSvg

    const navMultipleItemsWidth = ref?.current?.getBoundingClientRect()?.width
    const navMultipleItemsMargin = ref?.current?.getBoundingClientRect()?.x

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

    useEffect(() => {
        setDepartmentSize({ width: navMultipleItemsWidth, margin: navMultipleItemsMargin })
    }, [navMultipleItemsWidth, navMultipleItemsMargin])

    return (
        <Aux>
            <div className={classes.NavigationItems}>
                <NavigationMultipleItem
                    hover={showDepartment || departmentsHovered}
                    reference={ref}
                    item={departments}
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

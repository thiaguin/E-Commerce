import React, { useState, useEffect, useRef, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import NavigationItem from './NavigationItem/NavigationItem'
import NavigationMultipleItem from './NavigationMultipleItem/NavigationMultipleItem'
import classes from './NavigationItems.module.css'
import menuSvg from '../../../assets/menu.svg'
import menuHoverSvg from '../../../assets/menuHover.svg'
import Departments from './Departments/Departments'
import * as actions from '../../../store/actions/index'
import Aux from '../../hoc/Aux'
import { useHistory } from 'react-router-dom'

const NavigationItems = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const initGetDepartments = useCallback(() => dispatch(actions.getDepartment()), [dispatch])
    const { departments, categories } = props.navigation
    const [departmentsHovered, setDepartmentsHovered] = useState(false)
    const [showDepartment, setShowDepartment] = useState(false)
    const [departmentSize, setDepartmentSize] = useState({ width: 0, margin: 0 })

    const ref = useRef(null)

    const icon = showDepartment || departmentsHovered ? menuHoverSvg : menuSvg

    const navMultipleItemsWidth = ref?.current?.getBoundingClientRect()?.width
    const navMultipleItemsMargin = ref?.current?.getBoundingClientRect()?.x

    const categoriesClickHandler = ({ query, isAbout, ...item }) => {
        if (isAbout) return history.push('/about')

        if (query && !query['order[field]']) {
            const result: { name: string; values: string[] }[] = []

            for (const key in query) {
                result.push({ values: [key], name: item.name })
            }

            props.onSetFilters(result)
        } else {
            props.onSetFilters([])
        }

        props.onSelectItem(query)
        history.push('/products')
    }
    const items = categories.map((element, index) => (
        <NavigationItem item={element} click={categoriesClickHandler} key={index} />
    ))

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

    const onClickHandler = ({ query, name }) => {
        props.onSetFilters([{ values: ['department'], name }])
        props.onSelectItem(query)
        setShowDepartment(false)
        setDepartmentsHovered(false)
        history.push('/products')
    }

    useEffect(() => {
        initGetDepartments()
    }, [initGetDepartments])

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
                click={onClickHandler}
            />
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        navigation: state.navigation,
        products: state.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectItem: (query) => dispatch(actions.setProductsQuery(query)),
        onSetFilters: (value) => dispatch(actions.setFilters(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems)

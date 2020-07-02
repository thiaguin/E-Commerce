import React from 'react'
import classes from './ToolbarItem.module.css'
import Aux from '../../../hoc/Aux'
import ReactTooltip from 'react-tooltip'
const Tooltip: React.HTMLElement = ReactTooltip

const toolbarItem = (props) => {
    const classesName = [classes.ToolbarItem]
    props.isLogout && classesName.push(classes.Car)

    return (
        <Aux>
            <div data-tip={props.dataTip} className={classesName.join(' ')} onClick={props.click}>
                <img src={props.icon} alt="icon" />
            </div>
            <Tooltip type="light" />
        </Aux>
    )
}

export default toolbarItem

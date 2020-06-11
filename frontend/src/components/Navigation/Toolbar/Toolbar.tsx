import React, { useState } from 'react'
import classes from './Toolbar.module.css'
import SearchBar from '../../SearchBar/SearchBar'
import Logo from '../../Logo/Logo'
import Dialog from '../../Dialog/Dialog'
import ToolbarItem from '../../ToolbarItem/ToolbarItem'
import heartIcon from '../../../assets/heart.svg'
import carIcon from '../../../assets/car.svg'
import { useHistory } from 'react-router-dom'

const Toolbar = (props) => {
    const history = useHistory()
    const [productSearch, setProductSearch] = useState('')

    const inputHandlerChange = (event) => {
        const { value } = event.target
        setProductSearch(value)
    }

    const dialogClickHandle = () => {
        history.push('/login')
    }

    const toolbarItemClickHanler = (item) => {
        const route = item === 'car' ? '/shopping' : '/wishes'
        history.push(route)
    }

    console.log(productSearch)
    return (
        <div className={classes.Toolbar}>
            <Logo />
            <SearchBar value={productSearch} changed={(event) => inputHandlerChange(event)} />
            <Dialog click={dialogClickHandle} />
            <ToolbarItem icon={heartIcon} click={() => toolbarItemClickHanler('heart')} />
            <ToolbarItem icon={carIcon} click={() => toolbarItemClickHanler('car')} />
        </div>
    )
}

export default Toolbar

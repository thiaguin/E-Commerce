import React from 'react'
import classes from './SearchBar.module.css'
import searchIcon from '../../assets/search.svg'
import { useHistory } from 'react-router-dom'

const SearchBar = (props) => {
    const history = useHistory()

    const submitHandler = () => {
        history.push('/searching')
    }

    const onKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            submitHandler()
        }
    }

    return (
        <div onSubmit={submitHandler} className={classes.SearchBar}>
            <input
                placeholder="O que você está procurando?"
                type="text"
                value={props.value}
                onKeyDown={(event) => onKeyDownHandler(event)}
                onChange={props.changed}
                className={classes.SearchBarElement}
            />
            <img onClick={submitHandler} className={classes.SearchIcon} src={searchIcon} alt="icon" />
        </div>
    )
}

export default SearchBar

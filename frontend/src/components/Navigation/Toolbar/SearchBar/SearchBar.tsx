import React from 'react'
import classes from './SearchBar.module.css'
import searchIcon from '../../../../assets/search.svg'
import * as actions from '../../../../store/actions/index'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const SearchBar = (props) => {
    const history = useHistory()

    const submitHandler = () => {
        props.submit()
        props.onSetFilters([])
        props.onSearch({ title: props.value })
        history.push('/products')
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

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (query) => dispatch(actions.setProductsQuery(query)),
        onSetFilters: (value) => dispatch(actions.setFilters(value)),
    }
}

export default connect(null, mapDispatchToProps)(SearchBar)

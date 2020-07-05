import React from 'react'
import Aux from '../../components/hoc/Aux'
import Highlights from './Highlights/Highlights'
import Suggestions from './Suggestions/Suggestions'
import classes from './MainPage.module.css'

const mainPage = (props) => {
    return (
        <Aux>
            <div className={classes.MainPage}>
                <Highlights />
                <Suggestions />
            </div>
        </Aux>
    )
}

export default mainPage

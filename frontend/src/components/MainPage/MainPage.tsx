import React from 'react'
import Aux from '../hoc/Aux'
import Highlights from './Highlights/Highlights'
import Suggestions from './Suggestions/Suggestions'
import classes from './MainPage.module.css'

const mainPage = (props) => {
    return (
        <Aux>
            <div className={classes.MainPage} style={{ marginTop: '115px' }}>
                <Highlights />
                <Suggestions />
            </div>
        </Aux>
    )
}

export default mainPage

import React from 'react'
import Aux from '../hoc/Aux'
import Highlights from './Highlights/Highlights'

const mainPage = (props) => {
    return (
        <Aux>
            <div style={{ marginTop: '115px' }}>
                <Highlights />
            </div>
        </Aux>
    )
}

export default mainPage

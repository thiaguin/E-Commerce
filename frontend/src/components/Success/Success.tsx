import React, { useEffect } from 'react'
import classes from './Success.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Success = (props) => {
    const { onResetOrder } = props
    const historyAction = props.history?.action
    const history = useHistory()

    const onClickHandler = () => {
        history.push('/')
    }
    useEffect(() => {
        onResetOrder()
    }, [onResetOrder])

    useEffect(() => {
        if (historyAction !== 'REPLACE') {
            history.push('/')
        }
    }, [history, historyAction])

    return (
        <div className={classes.Success}>
            <h1>Seu pedido foi realizado com sucesso :)</h1>
            <button onClick={onClickHandler}>Voltar para o início</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onResetOrder: () => dispatch(actions.resetOrder()),
    }
}

export default connect(null, mapDispatchToProps)(Success)

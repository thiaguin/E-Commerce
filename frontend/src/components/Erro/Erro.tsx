import React, { useEffect } from 'react'
import classes from './Erro.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Erro = (props) => {
    const { onResetOrder } = props
    const historyAction = props.history?.action
    const history = useHistory()

    const onClickHandler = () => {
        history.push('/')
    }
    useEffect(() => {
        onResetOrder()
    }, [onResetOrder])

    console.log(historyAction)
    console.log('props history', props.history)

    useEffect(() => {
        if (historyAction !== 'REPLACE') {
            history.push('/')
        }
    }, [history, historyAction])

    return (
        <div className={classes.Erro}>
            <h1>Desculpe, ocorreu um erro :/</h1>
            <button onClick={onClickHandler}>Voltar para o início</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onResetOrder: () => dispatch(actions.resetOrder()),
    }
}

export default connect(null, mapDispatchToProps)(Erro)

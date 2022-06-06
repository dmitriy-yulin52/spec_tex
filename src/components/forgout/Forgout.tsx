import * as React from 'react'
import {ChangeEvent, memo, ReactElement, useCallback, useState} from "react";
import {UniversalDialog} from "../../utils/ComponentUtils";
import styles from "../signup/SignUp.module.sass";
import {button_style, password_style, validateEmailField} from "../signup/SignUp";
import classNames from "classnames";
import {setForgoutNumber} from "../../redux/auth/actions";
import {useDispatch} from "react-redux";


interface ForgoutProps {
    onClose: () => void
}

export const ForgoutDialog = memo((props: ForgoutProps): ReactElement => {
    const {onClose} = props

    const dispatch = useDispatch()

    const [onNumber, setOnNumber] = useState('')
    const [errorOnNumber, setErrorOnNumber] = useState<null | string>(null)
    const disable_button = !onNumber || !validateEmailField(onNumber)


    const onChangeOnNumberHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setOnNumber(e.target.value)
        setErrorOnNumber(null)
        if (!validateEmailField(onNumber)) {
            setErrorOnNumber('Поле должно содеражть только цифры начинающихся с +7')
        } else {
            setErrorOnNumber(null)
        }
        if (e.target.value.length > 12 && validateEmailField(onNumber)) {
            setErrorOnNumber('Некорректный номер телефона')
        }
        if (!e.target.value) {
            setErrorOnNumber('Обязательное поле')
        }
    }, [setOnNumber, onNumber, validateEmailField, setErrorOnNumber])


    const onSubmit = useCallback(() => {
        if (validateEmailField(onNumber)) {
            dispatch(setForgoutNumber(onNumber))
            setOnNumber('')
            onClose()
        }else {
            setErrorOnNumber('Некорректный номер телефона')
        }
    }, [setForgoutNumber, onNumber,setErrorOnNumber])


    return <UniversalDialog>
        <div className={styles.form}>
            <div className={styles.form_block}>
                <span className={classNames(styles.subtitle, {
                    [styles.subtitle_error]: errorOnNumber
                })}>Введите номер телефона</span>
                <input className={classNames(styles.input, {
                    [styles.error_input]: errorOnNumber
                })} value={onNumber} onChange={onChangeOnNumberHandler} placeholder={'Номер телефона'}/>
                <span className={classNames({
                    [styles.error_span]: errorOnNumber
                })}>{errorOnNumber}</span>
            </div>
        </div>
        <div style={password_style}>
            <a href={'#'} className={styles.link_password} onClick={onClose}>Назад</a>
        </div>
        <div style={button_style}>
            <button onClick={onSubmit} className={classNames(styles.button, {
                [styles.button_disabled]: disable_button
            })} disabled={disable_button}>ПОЗВОНИТЬ
            </button>
        </div>
    </UniversalDialog>
})

import * as React from "react";
import {ChangeEvent, ReactElement, useCallback, useEffect, useState} from "react";
import styles from './SignUp.module.sass'
import {UniversalDialog} from "../../utils/ComponentUtils";
import {ForgoutDialog} from "../forgout/Forgout";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {forgoutNumber} from "../../redux/auth/selectors";
import {setAuthUser} from "../../redux/auth/actions";

export const password_style = {
    display: 'flex', justifyContent: 'flex-end'
} as const

export const button_style = {
    display: 'flex', justifyContent: 'center', alignItems: 'center'
} as const

export function validateEmailField(value: string): boolean {
    return /^\+\d+$/.test(value)
}

export const SignUp = (): ReactElement => {

    const forgout_number: string = useSelector(forgoutNumber)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState<null | string>(null)
    const [errorPassword, setErrorPassword] = useState<null | string>(null)


    const isAvailable = login && password

    const disable_button = !isAvailable || !validateEmailField(login)


    const onCloseForgoutDialog = useCallback(() => {
        setOpen(!open)
    }, [open, setOpen])


    const onSubmit = useCallback(() => {
        if (isAvailable) {
            dispatch(setAuthUser({login: login, password: password}))
            setLogin('')
            setPassword('')
        } else {
            if (!login) {
                setErrorLogin('Обязательное поле')
            }
            if (!password) {
                setErrorPassword('Обязательное поле')
            }
        }
        console.log(login, password, validateEmailField(login))
    }, [password, login, setLogin, setPassword])

    const onChangeLoginHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        setErrorLogin(null)
        if (!validateEmailField(login)) {
            setErrorLogin('Поле должно содеражть только цифры и начинаться с +7')
        } else {
            setErrorLogin(null)
        }
        if (e.target.value.length > 12 && validateEmailField(login)) {
            setErrorLogin('Некорректный номер телефона')
        }
        if (!e.target.value) {
            setErrorLogin('Обязательное поле')
        }
    }, [setLogin, login, setErrorLogin, errorLogin])
    const onChangePasswordHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setErrorPassword(null)
        if (!e.target.value) {
            setErrorPassword('Обязательное поле')
        }
    }, [setPassword, password, setErrorPassword, errorPassword])


    const openForgoutDialog = useCallback(() => {
        setOpen(!open)
    }, [setOpen, open])

    useEffect(() => {
        setLogin(forgout_number)
    }, [forgout_number])

    return (<div className={classNames('logo', 'app')}>
        {!open && <UniversalDialog>
            <div className={styles.form}>
                <div className={styles.form_block}>
                    <span className={classNames(styles.subtitle, {
                        [styles.subtitle_error]: errorLogin
                    })}>Введите логин</span>
                    <input value={login} onChange={onChangeLoginHandler}
                           className={classNames(styles.input, {
                               [styles.error_input]: errorLogin
                           })}
                           placeholder={'Логин'}/>
                    <span className={classNames({
                        [styles.error_span]: errorLogin
                    })}>{errorLogin}</span>
                </div>
                <div className={styles.form_block}>
                    <span className={classNames(styles.subtitle, {
                        [styles.subtitle_error]: errorPassword
                    })}>Введите пароль</span>
                    <input value={password} onChange={onChangePasswordHandler} className={classNames(styles.input, {
                        [styles.error_input]: errorPassword
                    })}
                           placeholder={'Пароль'}/>
                    <span className={classNames({
                        [styles.error_span]: errorPassword
                    })}>{errorPassword}</span>
                </div>
            </div>
            <div style={password_style}>
                <a href={'#'} className={styles.link_password} onClick={openForgoutDialog}>Забыли пароль?</a>
            </div>
            <div style={button_style}>
                <button disabled={disable_button} className={classNames(styles.button, {
                    [styles.button_disabled]: !isAvailable || !validateEmailField(login)
                })} onClick={onSubmit}>Войти
                </button>
            </div>
        </UniversalDialog>}
        {open && <ForgoutDialog onClose={onCloseForgoutDialog}/>}
    </div>)
}
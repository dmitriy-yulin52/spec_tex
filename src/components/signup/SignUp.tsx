import * as React from "react";
import {ChangeEvent, memo, ReactElement, useCallback, useEffect, useState} from "react";
import {ForgoutDialog, login_mask} from "../forgout/Forgout";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {auth_user} from "../../redux/auth/selectors";
import {setAuthUser} from "../../redux/auth/actions";
import logo from '../../logo.png'
import {Dialog} from "../../utils/Dialog/Dialog";
import {forgout_password} from "../../redux/password-dialog/selectors";


export function validateLoginField(value: string): boolean {
    // return /^\d?\d+$/.test(value)
    return /^[0-9]*$/.test(value)
    // return /^[\+\d]?(?:[\d-.\s()]*)$/.test(value)
}

interface SignUpProps {
    success_user:boolean
}

export const SignUp = memo((props:SignUpProps): ReactElement => {

    const {success_user} = props

    const auth_user_login: string | undefined = useSelector(auth_user).login
    const auth_user_password: string | undefined = useSelector(auth_user).password
    const password_dialog_forgout_password: string = useSelector(forgout_password)


    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState<null | string>(null)
    const [errorPassword, setErrorPassword] = useState<null | string>(null)


    const isAvailable = login && password
    const disable_button = !isAvailable || !validateLoginField(login)


    const onSubmit = useCallback(() => {
        if ((login_mask(login.toString()) === auth_user_login) && (password === auth_user_password)) {
            dispatch(setAuthUser({login: login_mask(login.toString()), password: password}))
            setLogin('')
            setPassword('')
        } else {
            setErrorLogin('Неверный логин')
            setErrorPassword('Неверный пароль')
        }
        if (!login && !password) {
            setErrorLogin('Обязательное поле')
            setErrorPassword('Обязательное поле')
        }
        if (login_mask(login.toString()).length > 12) {
            setErrorLogin('Значение больше 12 символов')
        }
        // if (login_mask(login.toString()).length < 12) {
        //     setErrorLogin('Значение меньше 12 символов')
        // }
    }, [password, login, setLogin, setPassword, setErrorPassword, setErrorLogin, login_mask, login_mask])

    const onChangeLoginHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
        setErrorLogin(null)
        if (!validateLoginField(login)) {
            setErrorLogin('Некорректный номер телефона')
        } else {
            setErrorLogin(null)
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
        setLogin('')
        setPassword('')
        setErrorLogin('')
        setErrorPassword('')
    }, [setOpen, open, setLogin, setPassword, setErrorLogin, setErrorPassword])
    const onCloseForgoutDialog = useCallback(() => {
        setOpen(!open)
    }, [open, setOpen])


    useEffect(() => {
        if (password_dialog_forgout_password === auth_user_password) {
            const str = auth_user_login.slice(1, 12)
            setLogin(str)
        }
    }, [password_dialog_forgout_password])
    useEffect(() => {
        if (!success_user) {
            setLogin('')
        }
    }, [success_user])

    return (
        <div className={classNames('logo', 'app')}>
        <Dialog
            open={!open}
            icon={logo}
            form
            login={login}
            password={password}
            label_login={'Введите логин'}
            login_error={errorLogin}
            password_error={errorPassword}
            goButtonLabel={'Забыли пароль?'}
            submit_button_label={'Войти'}
            handlerSubmitButton={onSubmit}
            onChangeLogin={onChangeLoginHandler}
            onChangePassword={onChangePasswordHandler}
            label_password={'Введите пароль'}
            placeholder_login={'Логин'}
            handlerGoButtonLabel={openForgoutDialog}
            type_login_input
            disabled_button_submit={disable_button}
        />
        <ForgoutDialog onClose={onCloseForgoutDialog} open={open} auth_user_login={auth_user_login ?? ''}/>
    </div>)
})
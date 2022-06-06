import * as React from 'react'
import {ChangeEvent, memo, ReactElement, useCallback, useState} from 'react'
import {validateLoginField} from "../signup/SignUp";
import {useDispatch, useSelector} from "react-redux";
import {open_dialog} from "../../redux/password-dialog/selectors";
import {closePasswordDialog, openPasswordDialog, setForgoutPasswordAndLogin} from "../../redux/password-dialog/actions";
import {Dialog} from "../../utils/Dialog/Dialog";
import logo from '../../logo.png'


interface ForgoutDialogProps {
    onClose: () => void
    open: boolean
    auth_user_login: string
}

export function login_mask(value: string) {
    const regex = /(\d?)(\d{3})(\d{3})(\d{2})(\d{2})/g;
    const subst = "+$1$2$3$4$5";
    return value.replace(regex, subst);
}

export const ForgoutDialog = memo((props: ForgoutDialogProps): ReactElement => {
    const {onClose, open, auth_user_login} = props

    const dispatch = useDispatch()
    const open_password_dialog: boolean = useSelector(open_dialog)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error_login, set_error_Login] = useState<null | string>(null)
    const disable_button = !login || !validateLoginField(login)


    const onChangeLoginHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setLogin(e.currentTarget.value)
        set_error_Login(null)

        if (!validateLoginField(login)) {
            set_error_Login('Некорректный номер телефона')
        } else {
            set_error_Login('')
        }
         if (!e.target.value) {
            set_error_Login('Обязательное поле')
        }
    }, [setLogin, login, validateLoginField, set_error_Login])


    const onSubmit = useCallback(() => {
        if (login_mask(login.toString()) === auth_user_login) {
            dispatch(openPasswordDialog())
            // setLogin('')
        } else {
            set_error_Login('Некорректный номер телефона')
        }
        if (login_mask(login.toString()).length > 12) {
            set_error_Login('Значение больше 12 символов')
        }
        // if (login_mask(login.toString()).length < 12) {
        //     set_error_Login('Значение меньше 12 символов')
        // }
    }, [login, set_error_Login, setLogin, openPasswordDialog,login_mask])


    const onChangeHandlerPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [setPassword, password])

    const closePasswordDialogHandler = useCallback(() => {
        dispatch(closePasswordDialog())
    }, [closePasswordDialog])

    const onCloseDialogHandler = useCallback(() => {
        onClose()
        // setLogin('')
        set_error_Login('')
    }, [onClose, setLogin, login, set_error_Login, error_login])


    const onSubmitForgoutPassword = useCallback(()=>{
        dispatch(setForgoutPasswordAndLogin({login:login_mask(login.toString()),password:password}))
        closePasswordDialogHandler()
        onCloseDialogHandler()
    },[setForgoutPasswordAndLogin,password])

    return <>
        <Dialog
            open={open}
            form
            icon={logo}
            login={login}
            onChangeLogin={onChangeLoginHandler}
            label_login={'Введите номер телефона'}
            login_error={error_login}
            goButtonLabel={'Назад'}
            handlerSubmitButton={onSubmit}
            submit_button_label={'Восстановить'}
            disabled_button_submit={disable_button}
            handlerGoButtonLabel={onCloseDialogHandler}
            type_login_input
            placeholder_login={'Номер телефона'}
        />
        <Dialog
            form
            open={open_password_dialog}
            title={'Восстановление пароля'}
            label_password={'Придумайте пароль'}
            password={password}
            onChangePassword={onChangeHandlerPassword}
            goButtonLabel={'Назад'}
            handlerSubmitButton={onSubmitForgoutPassword}
            handlerGoButtonLabel={closePasswordDialogHandler}
            submit_button_label={'Создать пароль'}
        />
    </>
})

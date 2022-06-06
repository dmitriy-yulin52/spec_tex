import * as React from 'react'
import {ChangeEvent, memo, ReactElement, useCallback, useState} from 'react'
import styles from './Dialog.module.sass'
import classNames from "classnames";
import visible_password from "../../visibility-off.png";


interface DialogProps {
    icon?: any
    form?: boolean
    goButtonLabel?: string
    submit_button_label?: string
    handlerGoButtonLabel?: () => void
    handlerSubmitButton?: () => void
    open?: boolean
    title?: string
    login?: string
    login_error?: string | null
    password?: string
    password_error?: string | null
    label_login?: string
    label_password?: string
    onChangeLogin?: (e: ChangeEvent<HTMLInputElement>) => void
    onChangePassword?: (e: ChangeEvent<HTMLInputElement>) => void
    disabled_button_submit?: boolean
    isValidation?: boolean
    type_login_input?:boolean
    placeholder_login?:string
}


const password_style = {
    display: 'flex', justifyContent: 'flex-end'
} as const

const button_style = {
    display: 'flex', justifyContent: 'center', alignItems: 'center'
} as const

export const Dialog = memo((props: DialogProps): ReactElement => {

    const {
        icon,
        form,
        goButtonLabel,
        handlerSubmitButton,
        disabled_button_submit,
        handlerGoButtonLabel,
        label_login,
        open,
        login,
        onChangeLogin,
        title,
        login_error,
        password,
        label_password,
        onChangePassword,
        password_error,
        submit_button_label,
        isValidation,
        type_login_input,
        placeholder_login
    } = props

    const [type_input, setTypeInput] = useState(false)

    const handlerTypeInput = useCallback(()=> {
        setTypeInput(!type_input)
    },[setTypeInput,type_input])


    return (
        <>
            {open && (
                <div className={styles.wrapper}>
                    {icon && <div className={styles.logo}>
                        <img src={icon}/>
                    </div>}
                    {title && <h2 className={styles.title}>{title}</h2>}
                    {form && <div className={styles.form}>
                        {onChangeLogin  && <div className={styles.form_block}>
                            {label_login && <label className={classNames(styles.label,{
                                [styles.label_error]:login_error
                            })}>{label_login}</label>}
                            <input type={type_login_input ? 'number' : 'text'} value={login} onChange={onChangeLogin}
                                   className={classNames(styles.input, {
                                       [styles.error_input]: login_error
                                   })}
                                   placeholder={placeholder_login}/>
                            <span className={classNames({
                                [styles.error_span]: login_error
                            })}>{login_error}</span>
                        </div>}
                        {onChangePassword && <div className={styles.form_block}>
                            {label_password && <label className={ classNames(styles.label,{
                                [styles.label_error]:password_error
                            })}>{label_password}</label>}
                            <input type={type_input ? 'text' : 'password'} value={password} onChange={onChangePassword}
                                   className={classNames(styles.input, {
                                       [styles.error_input]: password_error
                                   })}
                                   placeholder={label_password}/>
                            <span className={classNames({
                                [styles.error_span]: password_error
                            })}>{password_error}</span>
                            <img src={visible_password}
                                 className={styles.icon_password}
                                 onClick={handlerTypeInput} />
                        </div>}
                    </div>}
                    {goButtonLabel && <div style={password_style}>
                        <a href={'#'} className={styles.link} onClick={handlerGoButtonLabel}>{goButtonLabel}</a>
                    </div>}
                    {submit_button_label && <div style={button_style}>
                        <button disabled={disabled_button_submit} className={classNames(styles.button_submit, {
                            [styles.button_submit_disabled]: disabled_button_submit
                        })} onClick={handlerSubmitButton}>{submit_button_label}
                        </button>
                    </div>}
                </div>
            )}
        </>
    )
})
import * as React from 'react'
import {ChangeEvent, ReactElement, useCallback, useState} from "react";
import styles from './PasswordDialog.module.sass'
import classNames from "classnames";
import icon from "../../visibility-off.png";


export const PasswordDialog = (): ReactElement => {

    const [type_input, setTypeInput] = useState(false)
    const [password, setPassword] = useState('')


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [setPassword, password])

    return <div className={styles.wrapper}>
        <h1>Восстановление пароля</h1>

        <form className={styles.form}>
            <label className={styles.label}>Придумайте пароль</label>
            <input type={type_input ? 'text' : 'password'} value={password} onChange={onChangeHandler}
                   className={classNames(styles.input, {
                       [styles.error_input]: !password
                   })}
                   placeholder={'Пароль'}/>
            <img src={icon}
                 style={{width: '16px', position: 'absolute', top: '30px', right: '10px', cursor: 'pointer'}}
                 onClick={()=>{}}/>
        </form>
    </div>
}
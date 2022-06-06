import * as React from 'react'
import {ReactElement, useCallback} from "react";
import styles from './Profile.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {auth_user} from "../../redux/auth/selectors";
import {UserType} from "../../redux/auth/auth-reducer";
import {exitAuthUser} from "../../redux/auth/actions";




export const Profile = ():ReactElement | null=> {

    const success_user: UserType | null = useSelector(auth_user)
    const dispatch = useDispatch()

    const exit_user = useCallback(()=>{
        dispatch(exitAuthUser())
    },[exitAuthUser])

    return <div>
        <div className={styles.wrapper}>
            <button onClick={exit_user} className={styles.button_exit}>Выйти</button>
        </div>
        <div className={styles.content}>
            <h1>Вы успешно авторизировались</h1>
            <div>
                <div>Ваш логин: {success_user && success_user.login}</div>
                <div>Ваш пароль: {success_user && success_user.password}</div>
            </div>
        </div>
    </div>
}
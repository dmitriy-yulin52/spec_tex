import * as React from 'react'
import {ReactElement} from "react";
import {SignUp} from "../signup/SignUp";
import {Profile} from "../profile/Profile";
import {successUser} from "../../redux/auth/selectors";
import {useSelector} from "react-redux";




export const Content = ():ReactElement=> {
    const success_user:boolean = useSelector(successUser)
    return <>
        {!success_user && <SignUp/>}
        {success_user && <Profile/>}
    </>
}
import {UserType} from "./auth-reducer";


export type ActionsType = ReturnType<typeof setForgoutNumber | typeof setAuthUser | typeof exitAuthUser>

export const setForgoutNumber = (forgout_number:string)=> {
    return{
        type:'SET_FORGOUT_NUMBER',
        forgout_number
    }as const
}

export const setAuthUser = (user:UserType)=> {
    return{
        type: 'SET_AUTH_USER',
        login:user.login,
        password:user.password
    }as const
}

export const exitAuthUser = ()=> {
    return {
         type: 'EXIT_AUTH_USER',
    }as const
}



export type ActionsType = ReturnType<typeof openPasswordDialog | typeof closePasswordDialog | typeof setForgoutPasswordAndLogin>

export const openPasswordDialog = ()=> {
    return {
        type:'OPEN_PASSWORD_DIALOG'
    }as const
}
export const closePasswordDialog = ()=> {
    return {
        type:'CLOSE_PASSWORD_DIALOG'
    }as const
}

export const setForgoutPasswordAndLogin = (payload:{login:string,password:string})=> {
    return {
        type:'SET_FORGOUT_PASSWORD_AND_LOGIN',
        payload
    }as const
}
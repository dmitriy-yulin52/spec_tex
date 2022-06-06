import {ActionsType} from "./actions";


export type InitialStateType = {
    open_dialog:boolean,
    forgout_password:string
    forgout_login:string
}
const initialState = {
    open_dialog:false,
    forgout_password:'',
    forgout_login:''
}

export const PasswordDialogReducer = (state:InitialStateType =initialState ,action:ActionsType)=> {
    switch (action.type) {
        case "OPEN_PASSWORD_DIALOG":
            return {
                ...state,
                open_dialog:true
            }
        case "CLOSE_PASSWORD_DIALOG":
            return {
                ...state,
                open_dialog: false,
            }
        case "SET_FORGOUT_PASSWORD_AND_LOGIN":
            return {
                ...state,
                forgout_login:action.payload.login,
                forgout_password:action.payload.password
            }
        default:
            return state
    }
}
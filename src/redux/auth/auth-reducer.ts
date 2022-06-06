import {ActionsType} from "./actions";


export type UserType = {
    login: string
    password: string
}

interface initialStateType {
    user: UserType
    error: boolean
    success:boolean
}

export const initialState = {
    user:{
        login:'+71111111111',
        password:'123456'
    },
    error: false,
    success:false
}

export const authReducer = (state: initialStateType = initialState, action: ActionsType):initialStateType => {
    switch (action.type) {
        case "SET_AUTH_USER":
            return {
                ...state,
                success:true,
                user:{
                    login:action.login,
                    password:action.password
                },
            }
        case "EXIT_AUTH_USER":
            return {
                ...state,
                success:false,
            }
        case "SET_FORGOUT_PASSWORD_AND_LOGIN":
            return {
                ...state,
                success: false,
                user:{
                    login:action.payload.login,
                    password: action.payload.password
                }
            }
        default:
            return state
    }
}
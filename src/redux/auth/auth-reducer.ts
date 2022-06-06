import {ActionsType} from "./actions";


export type UserType = {
    login: string
    password: string
}

interface initialStateType {
    user: UserType | null
    error: boolean
    forgout_number: string
    success:boolean
}

export const initialState = {
    user:null,
    error: false,
    forgout_number: '',
    success:false
}


export const authReducer = (state: initialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET_FORGOUT_NUMBER":
            return {
                ...state,
                success:false,
                forgout_number: action.forgout_number
            }
        case "SET_AUTH_USER":
            return {
                ...state,
                success:true,
                user:{
                    login:action.login,
                    password:action.password
                },
                forgout_number:''
            }
        case "EXIT_AUTH_USER":
            return {
                ...state,
                success:false,
                user:{
                    login:'',
                    password:''
                },
                forgout_number:''
            }
        default:
            return state
    }
}
import {combineReducers, createStore} from "redux";
import {authReducer} from "./auth/auth-reducer";
import {PasswordDialogReducer} from "./password-dialog/PasswordDialog-reducer";



const rootReducer = combineReducers({
    auth:authReducer,
    password_dialog:PasswordDialogReducer
})

export type RootState = ReturnType<typeof rootReducer>
export const store= createStore(rootReducer)

// @ts-ignore
window.store = store
import {combineReducers, createStore} from "redux";
import {authReducer} from "./auth/auth-reducer";



const rootReducer = combineReducers({
    auth:authReducer
})

export type RootState = ReturnType<typeof rootReducer>
export const store= createStore(rootReducer)

// @ts-ignore
window.store = store
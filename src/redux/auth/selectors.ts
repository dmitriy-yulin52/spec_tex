import {RootState} from "../store";
import {UserType} from "./auth-reducer";


export const auth = (state:RootState)=>state.auth

export const successUser = (state:RootState):boolean=>auth(state).success
export const auth_user = (state:RootState):UserType=>auth(state).user
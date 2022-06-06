import {RootState} from "../store";
import {InitialStateType} from "./PasswordDialog-reducer";


export const password_dialog = (state: RootState): InitialStateType => state.password_dialog
export const open_dialog = (state: RootState): boolean => password_dialog(state).open_dialog
export const forgout_password = (state: RootState): string => password_dialog(state).forgout_password

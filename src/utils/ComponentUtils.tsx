import * as React from 'react'
import {memo, ReactElement, ReactNode} from "react";
import icon from "../logo.png";
import styles from './ComponentUtils.module.sass'


interface UniversalDialogProps {
    children: ReactNode
}


export const UniversalDialog = memo((props: UniversalDialogProps): ReactElement => {

    const {children} = props
    return <div className={styles.wrapper}>
        <div className={styles.logo}>
            <img src={icon}/>
        </div>
        <div>
            {children}
        </div>
    </div>
})
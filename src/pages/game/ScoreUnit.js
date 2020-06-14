import React from 'react'
import styles from './style.module.scss'

const ScoreUnit = props => {
    const { title, value } = props

    return (
        <div className={styles.scoreUnit}>
            <div className={styles.scoreUnitName}>{title}</div>
            <div className={styles.scoreUnitVal}>{value}</div>
        </div>
    )
}

export default ScoreUnit
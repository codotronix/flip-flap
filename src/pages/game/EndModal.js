import React from 'react'
import styles from './style.module.scss'

const EndModal = props => {
    const { handleStart } = props
    return (
        <div className={styles.startPage}>
            <div className={styles.endModuleInner}>
                <h1> &#x2746; Congratulations  &#x2746;</h1>
                <h2>You Got 'Em All</h2>
                <span className={styles.startBtn} onClick={handleStart}>Play Again</span>
            </div>
        </div>
    )
}

export default EndModal
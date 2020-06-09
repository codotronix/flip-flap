import React from 'react'
import styles from './style.module.scss'

const Game = props => {
    const boxes = new Array(16).fill(9)
    return (
        <div>

            <div className={styles.boxContainer}>
            {
                boxes.map( (b, i) => 
                    <div key={i} className={styles.box}>
                        {i}
                    </div>
                )
            }
            </div>
            
        </div>
    )
}

export default Game
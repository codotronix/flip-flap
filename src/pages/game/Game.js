import React, { useState } from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'

const Game = props => {
    const [ flippedCards, setFlippedCards ] = useState({})

    const boxes = new Array(16).fill(9)

    const flipCard = i => setFlippedCards({
        ...flippedCards,
        [i]: !flippedCards[i]
    })

    return (
        <div>

            <div className={styles.boxContainer}>
            {
                boxes.map( (b, i) => 
                    <div key={i} className={styles.box}>
                        <div 
                            className={clsx(styles.boxInner, flippedCards[i] && styles.isFlipped)}
                            onClick={() => flipCard(i)}
                        >
                            <div 
                                className={clsx(styles.cardFace, styles.cardFaceFront)}
                                onClick={() => flipCard(i)}
                            >
                                front
                            </div>

                            <div 
                                className={clsx(styles.cardFace, styles.cardFaceBack)}
                            >
                                {i}
                            </div>
                        </div>
                    </div>
                )
            }
            </div>
            
        </div>
    )
}

export default Game
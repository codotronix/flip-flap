import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'

const Card = props => {
    const { card, onFlip } = props
    return (
        <div className={styles.box}>
            <div
                className={clsx(styles.boxInner, (card.isFlipped || card.isDone) && styles.isFlipped)}
                onClick={onFlip}
            >
                <div className={clsx(styles.cardFace, styles.cardFaceFront)}>
                    <span className={styles.fftxt}>?</span>
                </div>

                <div className={clsx(styles.cardFace, styles.cardFaceBack)}>
                    <img className={styles.gameImg} src={card.imgUrl} alt="Random Card Image"/>
                </div>
            </div>
        </div>
    )
}

export default Card
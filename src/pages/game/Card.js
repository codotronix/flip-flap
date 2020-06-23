import React from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
// import qImg from '../../assets/bg/faq-685060_640.jpg'
import qImg from '../../assets/bg/smiley-821993_640.jpg'

const Card = props => {
    const { card, onFlip } = props
    return (
        <div className={styles.box}>
            <div
                className={clsx(styles.boxInner, (card.isFlipped || card.isDone) && styles.isFlipped)}
                onClick={onFlip}
            >
                <div className={clsx(styles.cardFace, styles.cardFaceFront)}>
                    {/* <span className={styles.fftxt}>?</span> */}
                    {/* <img alt="Question Mark" src="assets/bg/faq-685060_640.jpg" /> */}
                    <img alt="Question Mark" src={qImg} />
                </div>

                <div className={clsx(styles.cardFace, styles.cardFaceBack)}>
                    <img className={styles.gameImg} src={card.imgUrl} alt="random reference"/>
                </div>
            </div>
        </div>
    )
}

export default Card
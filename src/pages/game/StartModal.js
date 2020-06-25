import React from 'react'
import styles from './style.module.scss'
import instructorImg from '../../assets/bg/bunny-155674_640.png'

const StartPage = props => {
    const { handleStart } = props
    return (
        <div className={styles.startPage}>
            <div className={styles.inner}>
                <h1>
                    <span className={styles.flipped}>Flip</span>
                    <span className={styles.flapped}>Flap</span>
                </h1>
                
                <p className={styles.instruction}>
                    Hey buddy, can you find all the matching pair of images with minimum number of clicks? Remember, each card is hiding an image. Whenever you click any card, it will show you the image.
                    <br/>
                    Good Luck !!!

                    <span className={styles.speechPointer}>&#x25BC;</span>
                </p>
                <div className={styles.imgContainer}>
                    <img src={instructorImg} 
                        alt="funny instructor" 
                        className={styles.instructorImg} />

                        <span 
                            className={styles.startGame}
                            onClick={handleStart}
                        >&#10140;</span>
                </div>
                
                
            </div>
        </div>
    )
}

export default StartPage

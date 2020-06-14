import React, { useState, useReducer } from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import ScoreUnit from './ScoreUnit'
import { getInitialCards } from './game.service'
import { cardsReducer, MARK_AS_DONE, MARK_AS_FLIPPED } from './game.reducer'

let clicks = [] // All the clicked card-indices serially stored

const getInitialState = () => {
    return getInitialCards()
}

const Game = props => {
    const [cards, dispatch] = useReducer(cardsReducer, getInitialState())

    const [allClicks, setAllClicks] = useState([])  // Array of all the Cards Indices that user clicks
    const [repeatClicks, setRepeatClicks] = useState(0) // A Nunber representing Repeat clicks on cards
    const [matchFound, setMatchFound] = useState(0) // Number of matches so far

    const flipCard = i => {
        // if it is a Done card, do nothing
        // if already flipped. do nothing
        if (cards[i].isDone || cards[i].isFlipped) return

        // Check if it is a repeat click
        if(allClicks.includes(i)) setRepeatClicks(repeatClicks + 1)

        // Record this click index, [to be tallied with future/next click index]
        let clicks = [...allClicks, i]
        setAllClicks(clicks)
        // clicks.push(i)
        console.log('click no. ', clicks.length)

        //Check with prev Index, is it a match ?
        let j = clicks[clicks.length - 2]   //1st time it will try to read index -1
        if (!isNaN(j) && isMatch(i, j)) {
            // Mark them as done
            markAsDone(i)
            markAsDone(j)
            console.log('Found 1 ...')
            setMatchFound(matchFound + 1)
        }
        else {
            markFlipped(i, true)
            console.log('Nope ...')
        }
    }

    /**
     * 
     * @param {Int} i | 
     * @param {Int} j 
     */
    const isMatch = (i, j) => cards[i].imgUrl === cards[j].imgUrl

    const markAsDone = i => {
        dispatch({type: MARK_AS_DONE, payload: {index: i}})
    }

    /**
     * Whatever isFlipped will get auto unflipped after certain period
     * @param {int} i | index
     */
    const markFlipped = (i, isFlipped = false) => {
        dispatch({ 
            type: MARK_AS_FLIPPED, 
            payload: {
                index: i,
                isFlipped
            }
        })

        // autoUnFlip after 1 sec
        if (isFlipped) {
            setTimeout(() => markFlipped(i), 3000)
        }
    }


    return (
        <div>
            <h2 className={styles.pageHeader}>Flip / Flap</h2>
            
            <div className={styles.scores}>
                <ScoreUnit title="Clicks" value={allClicks.length} />
                <ScoreUnit title="Repeat Clicks" value={repeatClicks} />
                <ScoreUnit title="Matches" value={`${matchFound} / 8`} />
            </div>

            <div className={styles.boxContainer}>
                {
                    cards.map((c, i) =>
                        <div key={i} className={styles.box}>
                            <div
                                className={clsx(styles.boxInner, (c.isFlipped || c.isDone) && styles.isFlipped)}
                                onClick={() => flipCard(i)}
                            >
                                <div
                                    className={clsx(styles.cardFace, styles.cardFaceFront)}
                                >
                                    <span className={styles.fftxt}>?</span>
                                </div>

                                <div
                                    className={clsx(styles.cardFace, styles.cardFaceBack)}
                                >
                                    <img className={styles.gameImg} src={c.imgUrl} />
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
import React, { useState, useReducer } from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import images from './imageList'

const MARK_AS_DONE = 'MARK_AS_DONE'
const MARK_AS_FLIPPED = 'MARK_AS_FLIPPED'

const getInitialState = () => {
    let imgList = [...images.list]

    // Let's randomly pick 8 images
    // as we are going to have 16 cards, so 8 pair 8 = 16
    while (imgList.length > 8) {
        let i = Math.floor(Math.random() * imgList.length)  // pick a random index
        imgList.splice(i, 1)    // remove that index
    }

    // console.log(imgList)

    let doubleList = [...imgList, ...imgList]

    // console.log(doubleList)

    // Shuffle the list 100 times
    for (let i = 0; i < 1000; i++) {
        let j = Math.floor(Math.random() * doubleList.length)
        let k = Math.floor(Math.random() * doubleList.length)

        // swap if not equal
        if (j !== k) {
            let temp = doubleList[j]
            doubleList[j] = doubleList[k]
            doubleList[k] = temp
        }
    }

    // console.log(doubleList)

    let newCards = doubleList.map((img, i) => ({
        id: i,
        imgUrl: `${images.root}/${img}`,
        isFlipped: false
    }))

    return newCards
}

function cardsReducer(state, action) {
    switch (action.type) {
        case MARK_AS_DONE: {
            const { index } = action.payload
            let newCards = [...state]
            newCards[index] = {
                ...newCards[index],
                isDone: true
            }
            return newCards
        }
        case MARK_AS_FLIPPED: {
            const { index, isFlipped } = action.payload
            let newCards = [...state]
            newCards[index] = {
                ...newCards[index],
                isFlipped
            }
            return newCards
        }
        default:
            throw new Error();
    }
}


const Game = props => {
    // const [ flippedCards, setFlippedCards ] = useState({})
    // const [cards, setCards] = useState([])
    const [cards, dispatch] = useReducer(cardsReducer, getInitialState())
    // const [prevClickedIndex, setPrevClickedIndex] = useState(null)
    const [allClicks, setAllClicks] = useState([])  // all the clicked indices

    const flipCard = i => {
        // if it is a Done card, do nothing
        // if already flipped. do nothing
        if (cards[i].isDone || cards[i].isFlipped) return

        // Record this click
        let clicks = [...allClicks, i]
        setAllClicks(clicks)
        console.log('click no. ', clicks.length)

        //Check with prev Index, is it a match ?
        let j = clicks[clicks.length - 2]   //1st time it will try to read index -1
        if (j && isMatch(i, j)) {
            // Mark them as done
            markAsDone(i)
            markAsDone(j)
            console.log('Found 1 ...')
        }
        else {
            markFlipped(i, true)
            console.log('Nope ...')
        }
    }

    const isMatch = (i, j) => {
        console.log('inside isMatch')
        console.log('cards[i].imgUrl = ', cards[i].imgUrl)
        console.log('cards[j].imgUrl = ', cards[j].imgUrl)
        console.log('returning ', cards[i].imgUrl === cards[j].imgUrl)
        return cards[i].imgUrl === cards[j].imgUrl
    }

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
            <h2>Flip / Flap</h2>
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
                                    <span className={styles.fftxt}>f/f</span>
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
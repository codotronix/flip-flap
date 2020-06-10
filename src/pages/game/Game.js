import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './style.module.scss'
import images from './imageList'

const Game = props => {
    const [ flippedCards, setFlippedCards ] = useState({})
    const [ cards, setCards ] = useState([])

    useEffect(() => {
        let imgList = [...images.list]
        
        // Let's randomly pick 8 images
        // as we are going to have 16 cards, so 8 pair 8 = 16
        while(imgList.length > 8) {
            let i = Math.floor(Math.random() * imgList.length)  // pick a random index
            imgList.splice(i, 1)    // remove that index
        }

        // console.log(imgList)

        let doubleList = [...imgList, ...imgList]

        // console.log(doubleList)

        // Shuffle the list 100 times
        for(let i=0; i<1000; i++) {
            let j = Math.floor(Math.random() * doubleList.length)
            let k = Math.floor(Math.random() * doubleList.length)

            // swap if not equal
            if(j !== k) {
                let temp = doubleList[j]
                doubleList[j] = doubleList[k]
                doubleList[k] = temp
            }
        }

        // console.log(doubleList)

        let newCards = doubleList.map( (img, i) => ({
            id: i,
            imgUrl: `/${images.root}/${img}`
        }))

        console.log(newCards)

        setCards(newCards)

    }, [])

    // const boxes = new Array(16).fill(9)

    const flipCard = i => setFlippedCards({
        ...flippedCards,
        [i]: !flippedCards[i]
    })

    return (
        <div>
            <div className={styles.boxContainer}>
            {
                cards.map(c => 
                    <div key={c.id} className={styles.box}>
                        <div 
                            className={clsx(styles.boxInner, flippedCards[c.id] && styles.isFlipped)}
                            onClick={() => flipCard(c.id)}
                        >
                            <div 
                                className={clsx(styles.cardFace, styles.cardFaceFront)}
                                onClick={() => flipCard(c.id)}
                            >
                                front
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
import images from './game.images'

/**
 * Prepares and returns an array of 16 card objects
 * Each card object will be a JSON of structure
 * {
        id: Integer,
        imgUrl: String,
        isFlipped: Boolean
 * }
 * 
 * But these 16 cards will point to 8 unique image URLs,
 * That means, a pair of cards will point to each unique image 
 * And thus, 8 pairs = 16 cards
 */
export const getInitialCards = () => {
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
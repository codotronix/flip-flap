import { getInitialCards } from './game.service'

// ACTION TYPES
export const MARK_AS_DONE = 'MARK_AS_DONE'
export const MARK_AS_FLIPPED = 'MARK_AS_FLIPPED'
export const INIT_GAME_STATE = 'INIT_GAME_STATE'


/**
 * Just like a Redux reducer, 
 * only difference between reducers of useReducer hook and redux are that
 * 
 * 1. In case of useReducer hook's reducer, we dont specify the state=initialState
 * in the reducer function definition default param. Rather supply/control it from
 * the useReducer hook, as in, useReducer(reducerFn, initialState)
 * 
 *  2. The default switch case of action.type, in case of useReducer hook's 
 * reducer function throws an error instead of returning the default state
 * 
 * @param {Object} state | An array of Cards, for cards structure, see game.service.js
 * @param {*} action | Normal redux action i.e. { type, payload }
 */
export const cardsReducer = (state, action) => {
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
        case INIT_GAME_STATE: {
            return getInitialCards()
        }
        default:
            throw new Error();
    }
}
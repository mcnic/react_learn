import axios from '../../axios/axios-quiz'
import { CREATE_QUIZ_QUESTION, CLEAR_QUIZ } from './actionTypes'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function clearQuiz() {
    return {
        type: CLEAR_QUIZ
    }
}
export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('quizes.json', getState().create.quiz)
        dispatch(clearQuiz())
    }
}
import {
    FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR,
    FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR,
    SET_ANSWER_RESULT, SET_QUIZ_FINISHED, SET_ACTIVE_QUISTION,
    CLEAR_QUIZ_RESULT
} from '../actions/actionTypes'

const initialState = {
    quizes: [],
    loading: true,
    error: null,
    results: {}, // {[id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' 'error'}
    quiz: []
}

export default function quizReducer(state = initialState, action) {
    // console.log('action.type', action.type);
    // console.log(action);
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, quizes: action.quizes, loading: false
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, error: action.error, loading: false
            }
        case FETCH_QUIZ_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, quiz: action.quiz, loading: false
            }
        case FETCH_QUIZ_ERROR:
            return {
                ...state, error: action.error, loading: false
            }
        case SET_ANSWER_RESULT:
            return {
                ...state, answerState: action.answerState, result: action.result
            }
        case SET_QUIZ_FINISHED:
            return {
                ...state, isFinished: action.isFinished
            }
        case SET_ACTIVE_QUISTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: action.answerState
            }
        case CLEAR_QUIZ_RESULT:
            return {
                ...state, results: action.results, isFinished: action.isFinished, activeQuestion: action.activeQuestion, answerState: action.answerState
            }

        default:
            return state

    }
}

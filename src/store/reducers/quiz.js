import * as types from '../actions/actionTypes'

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
        case types.FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case types.FETCH_QUIZES_SUCCESS:
            return {
                ...state, quizes: action.quizes, loading: false
            }
        case types.FETCH_QUIZES_ERROR:
            return {
                ...state, error: action.error, loading: false
            }
        case types.FETCH_QUIZ_START:
            return {
                ...state, loading: true
            }
        case types.FETCH_QUIZ_SUCCESS:
            return {
                ...state, quiz: action.quiz, loading: false
            }
        case types.FETCH_QUIZ_ERROR:
            return {
                ...state, error: action.error, loading: false
            }
        case types.SET_ANSWER_RESULT:
            return {
                ...state, answerState: action.answerState, result: action.result
            }
        case types.SET_QUIZ_FINISHED:
            return {
                ...state, isFinished: action.isFinished
            }
        case types.SET_ACTIVE_QUISTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: action.answerState
            }
        case types.CLEAR_QUIZ_RESULT:
            return {
                ...state, results: action.results, isFinished: action.isFinished, activeQuestion: action.activeQuestion, answerState: action.answerState
            }

        default:
            return state

    }
}

import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR,
    FETCH_QUIZ_START, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_ERROR,
    SET_ANSWER_RESULT, SET_QUIZ_FINISHED, SET_ACTIVE_QUISTION,
    CLEAR_QUIZ_RESULT
} from './actionTypes'


export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get('quizes.json')
            const quizes = Object.keys(response.data).map((key, index) => {
                return { id: key, name: `Тест №${index + 1}` }
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START,
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}

export function fetchQuiz(quizeId) {
    return async dispatch => {
        dispatch(fetchQuizStart())

        try {
            const response = await axios.get(`quizes/${quizeId}.json`)
            if (response.data === null) {
                throw new Error("error load data")
            }

            const quiz = []
            response.data.forEach(element => {
                quiz.push(element)
            });

            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizError(error))
        }

        dispatch(setAnswerResult({}, null))
    }
}

export function fetchQuizStart() {
    return {
        type: FETCH_QUIZ_START,
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    }
}

export function fetchQuizError(error) {
    return {
        type: FETCH_QUIZ_ERROR,
        error
    }
}





const quizFinished = (props) => props.activeQuestion >= (props.quiz.length - 1)

export function clickQuizAnswer(props, id) {
    return async dispatch => {
        if (props.answerState) {
            const key = Object.keys(props.answerState)[0]
            if (props.answerState[key] === 'success') {
                return
            }
        }

        const question = props.quiz[props.activeQuestion]
        const results = props.results

        if (question.rightAnswerId === id) {
            results[props.activeQuestion] = 'success'
            dispatch(setAnswerResult({ [id]: 'success' }, results))
        } else {
            results[props.activeQuestion] = 'error'
            dispatch(setAnswerResult({ [id]: 'error' }, results))
        }

        const timeout = window.setTimeout(() => {
            if (quizFinished(props)) {
                dispatch(setQuizFinished(true))
            } else {
                dispatch(setActiveQuestion(props.activeQuestion + 1))
            }

            window.clearTimeout(timeout)
        }, 1000)
    }

}

export function setAnswerResult(answerState, result) {
    return {
        type: SET_ANSWER_RESULT,
        answerState,
        result
    }
}

export function setQuizFinished(isFinished) {
    return {
        type: SET_QUIZ_FINISHED,
        isFinished
    }
}

export function setActiveQuestion(activeQuestion) {
    return {
        type: SET_ACTIVE_QUISTION,
        activeQuestion,
        answerState: null
    }
}

export function renewQuiz() {
    return dispatch => dispatch(clearQuizResult())
}

export function clearQuizResult() {
    return {
        type: CLEAR_QUIZ_RESULT,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null
    }
}


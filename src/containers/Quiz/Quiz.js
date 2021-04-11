import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, // {[id]: 'success' 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [
            {
                id: 0,
                question: 'Какого цвета небо?',
                rightAnswers: 2,
                answers: [
                    { text: 'Красного', id: 1 },
                    { text: 'Синего', id: 2 },
                    { text: 'Желтого', id: 3 },
                    { text: 'Черного', id: 4 }
                ]
            },
            {
                id: 1,
                question: 'В каком году основан Санкт-Петербург?',
                rightAnswers: 3,
                answers: [
                    { text: '1700', id: 1 },
                    { text: '1702', id: 2 },
                    { text: '1703', id: 3 },
                    { text: '1803', id: 4 }
                ]
            }

        ],
    }

    onRepeatHandler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null
        })
    }

    onAnswerClicHandler = (id) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswers === id) {
            results[this.state.activeQuestion] = 'success'
            this.setState({
                answerState: { [id]: 'success' },
                results
            })
        } else {
            results[this.state.activeQuestion] = 'error'
            this.setState({
                answerState: { [id]: 'error' },
                results
            })
        }
        const timeout = window.setTimeout(() => {
            if (this.quizFinished()) {
                this.setState({
                    isFinished: true
                })
            } else {
                this.setState({
                    'activeQuestion': this.state.activeQuestion + 1
                })
                this.setState({
                    answerState: null
                })
            }

            window.clearTimeout(timeout)
        }, 1000)

    }

    quizFinished = () => this.state.activeQuestion >= (this.state.quiz.length - 1)

    componentDidMount() {
        // console.log('quiz id ', this.props.match.params.id)
    }

    render() {
        return (
            <div className={classes.Quiz} >
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                resuls={this.state.results}
                                quiz={this.state.quiz}
                                onRepeatClick={this.onRepeatHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                quizLength={this.state.quiz.length}
                                activeQuestion={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                                onAnswerClick={this.onAnswerClicHandler}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz
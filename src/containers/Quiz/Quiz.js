import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
    state = {
        results: {}, // {[id]: 'success' 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [],
        loading: true
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

        if (question.rightAnswerId === id) {
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
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }

            window.clearTimeout(timeout)
        }, 1000)
    }

    quizFinished = () => this.state.activeQuestion >= (this.state.quiz.length - 1)

    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`)
            if (response.data === null) {
                throw new Error("error load data")
            }

            const quiz = []
            response.data.forEach(element => {
                quiz.push(element)
            });
            this.setState({
                quiz,
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        return (
            <div className={classes.Quiz} >
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.loading
                            ? <div><Loader /></div>
                            : this.state.isFinished
                                ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    onRepeatClick={this.onRepeatHandler}
                                />
                                : this.state.quiz.length === 0
                                    ? <h1>нет данных</h1>
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
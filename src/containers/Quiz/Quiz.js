import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuiz, renewQuiz, clickQuizAnswer } from '../../store/actions/quiz'

class Quiz extends Component {
    onRepeatHandler = () => {
        this.props.renewQuiz()
    }

    onAnswerClicHandler = (id) => {
        this.props.clickAnswer(this.props, id)
    }

    async componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.id)
        this.props.renewQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz} >
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading
                            ? <div><Loader /></div>
                            : this.props.isFinished
                                ? <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRepeatClick={this.onRepeatHandler}
                                />
                                : this.props.quiz.length === 0
                                    ? <h1>нет данных</h1>
                                    : <ActiveQuiz
                                        answers={this.props.quiz[this.props.activeQuestion].answers}
                                        question={this.props.quiz[this.props.activeQuestion].question}
                                        quizLength={this.props.quiz.length}
                                        activeQuestion={this.props.activeQuestion + 1}
                                        state={this.props.answerState}
                                        onAnswerClick={this.onAnswerClicHandler}
                                    />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDaspatchToProps(dispatch) {
    return {
        fetchQuiz: quizId => dispatch(fetchQuiz(quizId)),
        clickAnswer: (props, id) => dispatch(clickQuizAnswer(props, id)),
        renewQuiz: () => dispatch(renewQuiz())
    }
}

export default connect(mapStateToProps, mapDaspatchToProps)(Quiz)
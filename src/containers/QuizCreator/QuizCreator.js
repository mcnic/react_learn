import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import { createControl, validate } from '../../form/formFramework'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'

function createOptionControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends Component {
    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    componentDidMount() {
        console.log('creator')
    }

    submitHandler = event => {
        event.preventDefault()
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: event.target.value
        })
    }

    addQuestHandler = event => {
        event.preventDefault()

        const { question, option1, option2, option3, option4 } = this.state.formControls
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length,
            rightAnswerId: +this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }

    createQuizHandler = event => {
        event.preventDefault()

        try {
            this.props.finishCreateQuiz()

            this.setState({
                isFormValid: false,
                formControls: createFormControls(),
                rightAnswerId: 1
            })
        } catch (error) {
            console.log(error);
        }
    }

    inputChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        const isFormValid = Object.keys(formControls).reduce((valid, key) => valid && formControls[key].valid, true)

        this.setState({ formControls, isFormValid })
    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => this.inputChangeHandler(event.target.value, controlName)}
                    />

                    { index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        }
        )
    }

    render() {
        const select =
            <Select
                label='Выберите правильный ответ'
                value={this.state.rightAnswerId}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                ]}
            />


        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание тестов</h1>

                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}

                        {select}

                        <div>
                            <Button
                                type='primary'
                                disabled={!this.state.isFormValid}
                                onClick={this.addQuestHandler}
                            >
                                Добавить вопрос
                            </Button>

                            <Button
                                type='success'
                                disabled={this.props.quiz.length === 0}
                                onClick={this.createQuizHandler}
                            >
                                Создать тест
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDaspatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
}

export default connect(mapStateToProps, mapDaspatchToProps)(QuizCreator)
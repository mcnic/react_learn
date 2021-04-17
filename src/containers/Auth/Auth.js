import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { validate } from '../../form/formFramework'
import axios from 'axios'

export default class Auth extends Component {
    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                shouldValidate: true,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                shouldValidate: true,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        },
        isFormValid: false
    }

    loginHandler = async event => {
        event.preventDefault()
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.password.value,
                returnSecureToken: true
            }
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsacmGEn3dPQzx5yjHYfXQKdWGt-_P5P8', authData)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    registerHandler = async event => {
        event.preventDefault()
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.password.value,
                returnSecureToken: true
            }
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsacmGEn3dPQzx5yjHYfXQKdWGt-_P5P8', authData)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.value = event.target.value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control
        const isFormValid = Object.keys(formControls).reduce((valid, key) => valid && formControls[key].valid, true)

        this.setState({ formControls, isFormValid })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={control.shouldValidate}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        }
        )
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизоваться</h1>
                    <form className={classes.AuthForm}>
                        {this.renderInputs()}

                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>

                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Регистрация
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

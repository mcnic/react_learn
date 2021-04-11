import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'

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

    clickHandler = event => {
        event.preventDefault()
        console.log('success')
    }

    registerHandler = event => {
        event.preventDefault()
        console.log('register')
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.value = event.target.value
        control.touched = true
        control.valid = this.validate(control.value, control.validation)

        formControls[controlName] = control
        const isFormValid = Object.keys(formControls).reduce((valid, key) => valid && formControls[key].valid, true)

        this.setState({ formControls, isFormValid })
    }

    validate(value, validation) {
        if (!validation) {
            return true
        }

        let isFormValid = true

        if (validation.required === true) {
            isFormValid = value.trim() !== '' && isFormValid
        }

        if (validation.email) {
            // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // isFormValid = re.test(String(value).toLowerCase()) && isFormValid
            isFormValid = is.email(value) && isFormValid
        }

        if (validation.minLength) {
            isFormValid = value.length >= validation.minLength && isFormValid
        }

        return isFormValid
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
                            onClick={this.clickHandler}
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

import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { validate } from '../../form/formFramework'
import { connect } from 'react-redux'
import auth from '../../store/actions/auth'

class Auth extends Component {
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

    loginHandler = event => {
        event.preventDefault()

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    }

    registerHandler = event => {
        event.preventDefault()

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
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


const mapDispatchToProps = dispatch => ({
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
})

export default connect(null, mapDispatchToProps)(Auth)
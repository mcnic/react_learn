import React from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'

export default function QuizList() {
    const renderQuizes = (props) =>
        [1, 2, 3].map((quiz, index) =>
            <li key={index}>
                <NavLink to={'/quiz/' + quiz}>тест {quiz}</NavLink>
            </li>
        )

    return (
        <div className={classes.QuizList}>
            <h1>Список тестов</h1>
            <ul>
                {renderQuizes()}
            </ul>
        </div>
    )
}

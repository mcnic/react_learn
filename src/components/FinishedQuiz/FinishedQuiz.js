import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = props => {
    const rightAnswer = props.quiz.filter((quizItem, index) => props.results[quizItem.id] === 'success').length

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        props.results[quizItem.id] === 'error' ? classes.error : classes.success
                    ]

                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })

                }
            </ul>

            <p>Правильно {rightAnswer} из {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRepeatClick} type='primary'>Повторить</Button>
                <Link to='/'>
                    <Button type='success'>Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz
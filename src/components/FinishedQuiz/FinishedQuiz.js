import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = props => {
    const rightAnswer = props.quiz.filter((quizItem) => props.resuls[quizItem.id] === 'success').length
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.resuls[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        props.resuls[quizItem.id] === 'error' ? classes.error : classes.success
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
                <Button type='success'>Перейти в список тестов</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
    return (
        <div className={classes.FinishedQuiz}>
            {console.log(props.resuls)}
            {console.log(props.quiz)}
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

            <p>Правильно {1} из {props.quiz.length}</p>

            <div>
                <button>Повторить</button>
            </div>
        </div>
    )
}

export default FinishedQuiz
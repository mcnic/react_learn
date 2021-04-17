import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-69058-default-rtdb.firebaseio.com'
})
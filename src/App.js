import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import Logout from './components/Logout/Logout'
import { connect } from 'react-redux'
import { autoLogin } from './store/actions/auth'

class App extends Component {
  componentDidMount() {
    console.log('componentDidMount')
    this.props.autoLogin()
  }

  render() {
    console.log('render, auth=', this.props.isAuthenticated)

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
})

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
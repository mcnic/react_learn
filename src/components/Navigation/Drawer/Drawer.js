import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Drawer extends Component {
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        onClick={this.props.onClose}
                        activeClassName={classes.active}
                    >
                        {link.label}
                    </NavLink>
                </li >
            )
        })
    }

    render() {
        const cls = [classes.Drawer]
        cls.push(!this.props.isOpen ? classes.close : '')

        let links = [
            { to: '/', label: 'Список', exact: true }
        ]

        if (this.props.isAuthenticated) {
            links.push({ to: '/quiz-creator', label: 'Создать', exact: false })
            links.push({ to: '/logout', label: 'Выйти', exact: false })
        } else {
            links.push({ to: '/auth', label: 'Авторизация', exact: false })
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.token
})

export default connect(mapStateToProps)(Drawer);
import React, { Component } from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'Список', exact: true },
    { to: '/auth', label: 'Авторизация', exact: false },
    { to: '/quiz-creator', label: 'Создать', exact: false }
]

class Drawer extends Component {
    renderLinks() {
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

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
            </>
        )
    }
}

export default Drawer
import React, { Component } from 'react';
import classes from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'

class Layout extends Component {
    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    closeMenuHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <React.StrictMode>
                    <Drawer
                        isOpen={this.state.menu}
                        onClose={this.closeMenuHandler}
                    />

                    <MenuToggle
                        isOpen={this.state.menu}
                        onToggle={this.toggleMenuHandler}
                    />

                    <main>
                        {this.props.children}
                    </main>
                </React.StrictMode>
            </div>
        )
    }
}

export default Layout
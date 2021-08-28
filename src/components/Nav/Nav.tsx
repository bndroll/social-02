import React from "react"
import {NavLink} from "react-router-dom"

import './Nav.scss'


const Nav: React.FC = () => {
    return (
        <nav className="nav">
            <div className="nav__inner">
                <div className="nav__item">
                    <i className="far fa-user-circle"/>
                    <NavLink to="/profile" className="nav__link">Profile</NavLink>
                </div>
                <div className="nav__item">
                    <i className="far fa-envelope"/>
                    <NavLink to="/dialogs" className="nav__link">Messages</NavLink>
                </div>
                <div className="nav__item">
                    <i className="fas fa-users"/>
                    <NavLink to="/users" className="nav__link">Users</NavLink>
                </div>
                <div className="nav__item">
                    <i className="far fa-envelope"/>
                    <NavLink to="/chat" className="nav__link">Chat</NavLink>
                </div>
                <div className="nav__item">
                    <i className="fas fa-kiwi-bird"/>
                    <NavLink to="/news" className="nav__link">News</NavLink>
                </div>
                <div className="nav__item">
                    <i className="fas fa-headphones-alt"/>
                    <NavLink to="/music" className="nav__link">Music</NavLink>
                </div>
                <div className="nav__item">
                    <i className="fas fa-cog"/>
                    <NavLink to="/settings" className="nav__link">Settings</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Nav
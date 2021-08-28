import React from "react"
import {NavLink} from "react-router-dom"

import './Header.scss'
import {useDispatch, useSelector} from "react-redux"
import {getIsAuth, getLogin} from "../../redux/Selectors/HeaderSelectors"
import {logout} from "../../redux/Reducers/authReducer"


const Header: React.FC = () => {
    const isAuth = useSelector(getIsAuth),
          login = useSelector(getLogin)

    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(logout())
    }

    return (
        <div className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <i className="fab fa-stumbleupon"/>
                </div>
                {isAuth ? <div className="header__profile">
                                    <div className="profile__name">{login}</div>
                                    <div className="profile__logo">
                                        <i className="far fa-user-circle"/>
                                    </div>
                                    <button onClick={logoutUser} className="header__logout">Logout</button>
                                </div> :
                                <div className="header__login">
                                    <NavLink to="/login" className="header__link">Login</NavLink>
                                </div>}
            </div>
        </div>
    )
}

export default Header
import React, { useEffect, useState } from 'react';
import { getAccessTokenDecoded, logout } from 'core/utils/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './styles.scss';

import menu from 'core/assets/images/menu.svg'

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState('');
    const location = useLocation();
    const [drawerActive, setDrawerActive] = useState(false);

    useEffect(() => {
        const currentUserData = getAccessTokenDecoded();
        setCurrentUser(currentUserData.user_name);
    }, [location]);

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault(); // Interrompe o comportamento padrao da url;
        logout();
    }

    return (
        <nav className="bg-primary main-nav">

            <Link to="/" className="nav-logo-text">
                <h4>DS Catalog</h4>
            </Link>

            <button
                className="menu-mobile-btn"
                type='button'
                onClick={() => setDrawerActive(!drawerActive)}
            >
                <img src={menu} alt="Mobile menu" />
            </button>

            <div className={drawerActive ? "menu-mobile-container" : "menu-container"}>
                <ul className="main-menu">
                    <li>
                        <NavLink
                            to="/" exact
                            className="nav-link"
                            onClick={() => setDrawerActive(false)}
                        >
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className="nav-link"
                            onClick={() => setDrawerActive(false)}
                        >
                            CATÁLOGO
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin"
                            className="nav-link"
                            onClick={() => setDrawerActive(false)}
                        >
                            ADMIN
                        </NavLink>
                    </li>
                    {drawerActive && (
                        <>
                            {currentUser && (
                                <li>
                                    <a
                                        href="#logout"
                                        className='nav-link active d-inline'
                                        onClick={(event) => {
                                            handleLogout(event);
                                            setDrawerActive(false);
                                        }}
                                    >
                                        {`LOGOUT - ${currentUser}`}
                                    </a>
                                </li>
                            )}
                        </>
                    )}
                    {drawerActive && (
                        !currentUser && (
                            <li>
                                <Link
                                    to="/auth/login"
                                    className="nav-link active"
                                    onClick={() => setDrawerActive(false)}>
                                    LOGIN
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className="user-info-dnone text-right">
                {currentUser && (
                    <>
                        {currentUser}
                        <a
                            href="#logout"
                            className="nav-link active d-inline"
                            onClick={handleLogout}
                        >
                            LOGOUT
                        </a>
                    </>
                )}
                {!currentUser && (
                    <Link to="/auth/login" className="nav-link active">
                        LOGIN
                    </Link>
                )}
            </div>
        </nav>
    )
};

export default Navbar;
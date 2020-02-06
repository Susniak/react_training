import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Base application component
 */
export default class PageHeaderComponent extends React.Component {
    render() {
        return <div className="page-header">
            <div className="page-header__container">
                <div className="page-header__title">
                    Organiser
                </div>
                <div className="page-header__menu-container">
                    <ul className="page-header__menu">
                        <li className="page-header__menu-element">
                            <Link to="/">Powiadomienia</Link>
                        </li>
                        <li className="page-header__menu-element">
                            <Link to="/transfers">Przelewy bankowe</Link>
                        </li>
                        <li className="page-header__menu-element">
                            <Link to="/notes">Notatki</Link>
                        </li>
                        <li className="page-header__menu-element">
                            <Link to="/events">Stale wydarzenia</Link>
                        </li>
                        <li className="page-header__menu-element">
                            <Link to="/photos">Katalog zdjec</Link>
                        </li>
                        <li className="page-header__menu-element">
                            <Link to="/lists">Listy</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    }
}

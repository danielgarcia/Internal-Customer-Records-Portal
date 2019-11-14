import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../Routes';

class AppMenu extends React.Component<{}> {

    public render(): JSX.Element {
        return (
            <div className="app-menu">
                <ul className="nav-list">
                    <li className="logo" title="Covr"><img src="/images/COVR-White.png" alt="Covr" /></li>
                    <li><NavLink exact to={routes.Dashboard.route}>Dashboard</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default AppMenu;

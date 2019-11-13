import * as React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../Routes';

class AppMenu extends React.Component<{}> {

    public render(): JSX.Element {
        return (
            <div className="app-menu">
                <ul className="nav-list">
                    <li className="logo" title="Covr"><img src="./images/COVR-White.png" /></li>
                    <li><Link to={routes.Dashboard.route}>Dashboard</Link></li>
                </ul>
            </div>
        );
    }
}

export default AppMenu;

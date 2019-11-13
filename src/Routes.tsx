import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './core/history';

import AppFrame from './components/AppFrame/AppFrame';

import Dashboard from './pages/Dashboard/Dashboard';
import Candidate from './pages/Candidate/Candidate';

/**
 * Application routes.
 */
const routes = {
    Dashboard: { route: '/' },
    Candidate: { route: '/candidate' },
};

class Routes extends React.Component {
    public render(): JSX.Element {
        return (
            <Router history={history}>
                <Route exact path="/">
                    <AppFrame>
                        <Switch>
                            <Route exact path={routes.Dashboard.route} component={Dashboard} />
                            <Route exact path={routes.Candidate.route} component={Candidate} />
                            <Redirect from='*' to={routes.Dashboard.route} />
                        </Switch>
                    </AppFrame>
                </Route>
            </Router>
        );
    }
}

export default Routes;
export { routes };

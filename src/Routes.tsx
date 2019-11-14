import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './core/history';

import AppFrame from './components/AppFrame/AppFrame';

import Dashboard from './pages/Dashboard/Dashboard';
import CustomerDetails from './pages/CustomerDetails/CustomerDetails';
import NotFound from './pages/NotFound/NotFound';

/**
 * Application routes.
 */
const routes = {
    Dashboard: { route: '/' },
    CustomerDetails: { route: '/customer/:customerID', go: (id: string): string => `/customer/${id}` },
    NotFound: { route: '/not-found' },
};

class Routes extends React.Component {
    public render(): JSX.Element {
        return (
            <Router history={history}>
                <AppFrame>
                    <Switch>
                        <Route exact path={routes.Dashboard.route} component={Dashboard} />
                        <Route exact path={routes.CustomerDetails.route} component={CustomerDetails} />
                        <Route exact path={routes.NotFound.route} component={NotFound} />
                        <Redirect from='*' to={routes.Dashboard.route} />
                    </Switch>
                </AppFrame>
            </Router>
        );
    }
}

export default Routes;
export { routes };

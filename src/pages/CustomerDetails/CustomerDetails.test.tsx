import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dashboard from './Dashboard';

it('renders Report without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
});

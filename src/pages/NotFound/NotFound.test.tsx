import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NotFound from './NotFound';

it('renders Report without crashing', (): void => {
    const div = document.createElement('div');
    ReactDOM.render(<NotFound />, div);
    ReactDOM.unmountComponentAtNode(div);
});
import * as React from 'react';

class NotFound extends React.Component {

    public render(): JSX.Element {
        return (
            <div className="not-found-page">
                <p>Oops!</p>
                <p>Page Not Found</p>
            </div>
        );
    }
}

export default NotFound;

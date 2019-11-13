import * as React from 'react';
import AppMenu from '../AppMenu/AppMenu';

class AppFrame extends React.Component<{}> {

    public render(): JSX.Element {
        return (
            <div className="app-frame">
                <AppMenu />
                <div className="app-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default AppFrame;

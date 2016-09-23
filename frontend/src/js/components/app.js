'use strict';

import React, {Component, PropTypes} from 'react';
import Popup from './popup';

class App extends Component {

    constructor(props) {
        super(props);

        this.alertOptions = {
            offset: 20,
            position: 'top right',
            theme: 'light',
            time: 7000,
            transition: 'scale'
        };

        this.popupOptions = {

        };

    }

    componentDidMount() {
    }

    getChildContext() {
        return {
            getPopup: () => this.refs.popup
        };
    }

    render() {
        const {children} = this.props;
        return (
            <div className="full-height">
                <Popup ref="popup" {...this.popupOptions} />
                {children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

App.childContextTypes = {
    getPopup: PropTypes.func
};

export default App;
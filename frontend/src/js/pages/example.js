'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class ExamplePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {value} = this.props;
        return (
            <div>Hellow World {value}</div>
        );
    }
}

ExamplePage.propTypes = {
    value: PropTypes.number
};

export default connect(
    state => ({ value: state.value }),
    dispatch => ({

    })
)(ExamplePage);
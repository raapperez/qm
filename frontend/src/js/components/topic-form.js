'use strict';

import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

class TopicForm extends Component {

    constructor(props) {
        super(props);

        this.onCancel = this.onCancel.bind(this);
    }

    onCancel(e) {
        e.preventDefault();

        const {onCancel} = this.props;
        onCancel();
    }

    render() {
        const {handleSubmit, submitting, onSubmit, error} = this.props;

        return (
            <div className="topic-form-component">
                <div className="well">
                    <form onSubmit={handleSubmit(onSubmit) }>
                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <Field name="subject" id="subject" className="form-control" component="input" type="text" maxLength="255" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Question</label>
                            <Field name="message" id="message" className="form-control" component="textarea" maxLength="255" required />
                        </div>

                        {error ?
                            <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span className="sr-only">Error: </span> {error}
                            </div>
                            : null
                        }

                        <button type="submit" className="btn btn-primary" disabled={submitting}>Post</button>
                        <a className="btn btn-default cancel-button" onClick={this.onCancel}>Cancel</a>

                    </form>
                </div>
            </div>
        );
    }
}

TopicForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onCancel: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'topic'
})(TopicForm);

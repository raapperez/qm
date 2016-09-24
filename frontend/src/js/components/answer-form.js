'use strict';

import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';

class AnswerForm extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {handleSubmit, submitting, onSubmit, error} = this.props;

        return (
            <div className="topic-form-component panel panel-default">
                <div className="panel-heading">
                    <h3>New topic</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={handleSubmit(onSubmit) }>

                        <div className="form-group">
                            <label htmlFor="message">Answer</label>
                            <Field name="message" id="message" className="form-control" component="textarea" required />
                        </div>

                        {error ?
                            <div className="alert alert-danger" role="alert">
                                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span className="sr-only">Error: </span> {error}
                            </div>
                            : null
                        }

                        <button type="submit" className="btn btn-primary" disabled={submitting}>Post</button>

                    </form>
                </div>
            </div>
        );
    }
}

AnswerForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default reduxForm({
    form: 'topic'
})(AnswerForm);

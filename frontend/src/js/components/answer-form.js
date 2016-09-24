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
            <div className="topic-form-component well">
                    <form onSubmit={handleSubmit(onSubmit) }>

                        <div className="form-group">
                            <label htmlFor="message">Add a reply</label>
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

                    </form>
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

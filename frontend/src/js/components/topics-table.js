'use strict';

import React, {Component, PropTypes} from 'react';
import moment from 'moment';


class TopicsTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {topics, openTopic} = this.props;

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                Subject
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Replies
                            </th>
                            <th>
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            topics.map(topic => (
                                <tr key={topic.id} className="clickable" onClick={
                                    e => {
                                        e.preventDefault();
                                        openTopic(topic);
                                    }
                                }>
                                    <td>{`${topic.subject}`}</td>
                                    <td>{`${topic.author.firstName} ${topic.author.lastName}`}</td>
                                    <td>{`${topic.answers.length}`}</td>
                                    <td>{`${moment(topic.createdAt).fromNow()}`}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        );
    }
}

TopicsTable.propTypes = {
    topics: PropTypes.array.isRequired,
    openTopic: PropTypes.func.isRequired
};

export default TopicsTable;
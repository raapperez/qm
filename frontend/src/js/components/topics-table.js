'use strict';

import React, {Component, PropTypes} from 'react';


class TopicsTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {topics} = this.props;
        
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
                                Responses
                            </th>
                            <th>
                                Created at
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            topics.map(topic => (
                                <tr key={topic.id}>
                                    <td>{`${topic.subject}`}</td>
                                    <td>{`${topic.author.firstName} ${topic.author.lastName}`}</td>
                                    <td>{`${topic.responses}`}</td>
                                    <td>{`${topic.createdAt}`}</td>
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
    topics: PropTypes.array.isRequired
};

export default TopicsTable;
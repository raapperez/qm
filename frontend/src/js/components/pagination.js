'use strict';

import React, {PropTypes} from 'react';
import classNames from 'classnames';

const Pagination = ({
    page,
    totalPages,
    goToPage
}) => {

    const showPages = 5;
    const halfPages = Math.floor(showPages / 2);

    let minPage = Math.max(1, page - halfPages);
    let maxPage = showPages + minPage - 1;

    if (maxPage > totalPages) {
        maxPage = totalPages;
        minPage = Math.max(1, maxPage - showPages + 1);
    }

    let pages = [];

    for (let i = minPage; i <= maxPage; i++) {
        pages.push(i);
    }
    
    return (

        <ul className="pagination">
            <li className={classNames({disabled: page === 1})}>
                <a aria-label="Previous" onClick={e => {
                                                    e.preventDefault();
                                                    goToPage(1);
                                                }}>
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            {pages.map(p => (
                <li className={classNames({active: page === p})} key={p}>
                    <a onClick={e => {
                                    e.preventDefault();
                                    goToPage(p);
                                }}>
                        {p}
                    </a>
                </li>
            ))}

            <li className={classNames({disabled: page === totalPages})}>
                <a onClick={e => {
                                e.preventDefault();
                                goToPage(totalPages);
                            }}>
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>          
        </ul>

    );
};


Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    goToPage: PropTypes.func.isRequired
};

export default Pagination;
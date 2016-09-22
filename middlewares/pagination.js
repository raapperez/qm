'use strict';

const validator = require('validator');

module.exports = (req, res, next) => {
    let {page, pageSize, where, order} = req.query;

    page = page || 1;

    if (typeof page === 'string' && validator.isInt(page)) {
        page = parseInt(page);
    }


    if (typeof page !== 'number' || page <= 0) {
        const error = new Error('Invalid page query param.');
        error.status = 400;
        next(error);
        return;
    }

    pageSize = pageSize || 10;

    if (typeof pageSize === 'string' && validator.isInt(pageSize)) {
        pageSize = parseInt(pageSize);
    }

    if (typeof pageSize !== 'number' || pageSize <= 1) {
        const error = new Error('Invalid pageSize query param.');
        error.status = 400;
        next(error);
        return;
    }

    if (where) {
        try {
            where = JSON.parse(where);
        } catch (err) {
            const error = new Error('Invalid where query param.');
            error.status = 400;
            next(error);
            return;
        }
    }

    if (order) {
        try {
            order = JSON.parse(order);
        } catch (err) {
            const error = new Error('Invalid orderBy query param.');
            error.status = 400;
            next(error);
            return;
        }
    }

    req.pagination = {
        page,
        pageSize,
        where,
        order
    };

    next();

};


'use strict';

const permissions = require('../configs/permissions');
const logger = require('winston');

const forbiddenError = new Error('No permission granted');
forbiddenError.status = 403;

module.exports = (action, isOwner) => {

    return (req, res, next) => {
        if (!permissions[action]) {
            logger.warn(`Missing permission definition for action {action}`);
            next();
            return;
        }

        const permissionList = permissions[action];

        if (permissionList.indexOf(req.user.role) !== -1) {
            next();
            return;
        }

        if (permissionList.indexOf('owner') !== -1 && isOwner) {

            isOwner(req.user.id, req.params.id).then(isOwner => {
                if (isOwner) {
                    next();
                    return;
                }
                next(forbiddenError);
            }).catch(err => {
                next(err);
            });

            return;
        }


        next(forbiddenError);

    };
};

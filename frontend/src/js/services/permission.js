'use strict';

import permissions from '../constants/permissions';


class Permission {
    has(user, action, resource, ownerAttribute) {
        if (!permissions[action]) {
            console.log(`Missing permission definition for action ${action}`);
            return false;
        }

        const permissionList = permissions[action];

        if (permissionList.indexOf(user.role) !== -1) {
            return true;
        }

        if (permissionList.indexOf('owner') !== -1 && user.id === resource[ownerAttribute]) {
            return true;
        }

        return false;
    }
}


export default new Permission();
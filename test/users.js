'use strict';

const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
const rp = require('request-promise');
const _ = require('lodash');
const uuid = require('uuid');

chai.use(chaiAsPromised);

const host = 'http://localhost:3001/api/v1';

let createdProperty;

describe('qm forum api', () => {
    before(() => {

        return rp.get({ uri: `${host.replace(/\/api\/v[0-9]*/, '')}/health`, json: true }).then(({status}) => {
            if (status !== 'UP') {
                return Promise.reject();
            }
        }).catch(() => {
            return Promise.reject('API is not up');
        });
    });

    describe('users', () => {

        let userId;

        const user = {
            email: `tester-${uuid}@test.com`,
            password: 'tester',
            role: 'student',
            firstName: 'John',
            lastName: 'Studenty'
        };

        describe('POST /users', () => {

            it('Should create a new user', () => {

                const promise = rp.post({
                    uri: `${host}/users`,
                    json: true,
                    body: user
                });

                return promise.then(createdUser => {
                    userId = createdUser.id;
                    createdUser.email.should.be.equal(user.email);
                    createdUser.password.should.be.equal(user.password);
                    createdUser.role.should.be.equal(user.role);
                    createdUser.firstName.should.be.equal(user.firstName);
                    createdUser.lastName.should.be.equal(user.lastName);
                    createdUser.isActive.should.be.equal(true);
                    createdUser.should.have('id');
                    createdUser.should.have('createdAt');
                    createdUser.should.have('updatedAt');

                    Object.keys(createdUser).should.have.legth(9);

                });
            });
        });

        describe('GET /users/:id', () => {

            it('Should get a user', () => {
                const promise = rp.get({
                    uri: `${host}/users/${userId}`,
                    json: true
                });

                return promise.then(receivedUser => {
                    receivedUser.id.should.be.equal(userId);
                    receivedUser.email.should.be.equal(user.email);
                    receivedUser.password.should.be.equal(user.password);
                    receivedUser.role.should.be.equal(user.role);
                    receivedUser.firstName.should.be.equal(user.firstName);
                    receivedUser.lastName.should.be.equal(user.lastName);
                    receivedUser.isActive.should.be.equal(true);
                    receivedUser.should.have('id');
                    receivedUser.should.have('createdAt');
                    receivedUser.should.have('updatedAt');

                    Object.keys(receivedUser).should.have.legth(9);
                });
            });
        });

        it('Should get a 404 error if user does not exist', () => {
            const promise = rp.get({
                uri: `${host}/users/${uuid.v4()}`,
                json: true
            });

            return promise.then(() => {
                throw 'Should not be success';
            }).catch(err => {
                err.status.should.be.equal(404);
            });
        });
    });

    describe('DELETE /users/:id', () => {

        it('Should delete a user', () => {
            const promise = rp.delete({
                uri: `${host}/users/${userId}`,
                json: true,
                body: user
            });

            return promise.catch(() => {
                throw 'Should not fail';
            });
        });
    });

    it('Should get a 404 error if user does not exist', () => {
        const promise = rp.get({
            uri: `${host}/users/${uuid.v4()}`,
            json: true,
            body: user
        });

        return promise.then(() => {
            throw 'Should not be success';
        }).catch(err => {
            err.status.should.be.equal(404);
        });
    });
});

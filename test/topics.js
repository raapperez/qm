'use strict';

const env = process.env.NODE_ENV || 'development';
const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
const rp = require('request-promise');
const _ = require('lodash');
const uuid = require('uuid');

chai.use(chaiAsPromised);

const host = 'http://localhost:3000/api/v1';

const createUserAndLogin = (user) => {
    return rp.post({
        uri: `${host}/auth/login`,
        json: true,
        body: user
    }).catch(err => {
        if (err.statusCode === 404) {
            return rp.post({
                uri: `${host}/users`,
                json: true,
                body: user
            }).then(() => {
                return createUserAndLogin(user);
            });
        }
    }).then(result => result.token);

};

describe('qm forum api', () => {

    const studentUser = {
        email: 'tester-student@test.com',
        firstName: 'Tester',
        lastName: 'Student',
        password: 'h8gQHWtt',
        role: 'student',
        token: null
    };

    const adminUser = {
        email: 'tester-admin@test.com',
        firstName: 'Tester',
        lastName: 'Admin',
        password: 'MbFSqu6n',
        role: 'admin',
        token: null
    };

    before(() => {

        if (env !== 'development') {
            throw 'Tests must run in development env';
        }

        return rp.get({ uri: `${host.replace(/\/api\/v[0-9]*/, '')}/health`, json: true }).then(({status}) => {
            if (status !== 'UP') {
                return Promise.reject();
            }
        }).catch(() => {
            return Promise.reject('API is not up');
        }).then(() => {

            return Promise.all([
                createUserAndLogin(studentUser),
                createUserAndLogin(adminUser)
            ]).then(_.spread((studentToken, adminToken) => {
                studentUser.token = studentToken;
                adminUser.token = adminToken;
            }));

        });
    });

    describe('topics', () => {

        let studentTopicId;
        const studentTopic = {
            subject: 'Student topic subject',
            message: 'Student topice message'
        };

        let adminTopicId;
        const adminTopic = {
            subject: 'Admin topic subject',
            message: 'Admin topice message'
        };

        describe('CREATE /topics', () => {

            it('Should be able to a student create a topic', () => {
                return rp.post({
                    uri: `${host}/topics`,
                    json: true,
                    body: studentTopic,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(topic => {
                    topic.id.should.be.a('string');
                    topic.subject.should.be.equal(studentTopic.subject);
                    topic.message.should.be.equal(studentTopic.message);
                    topic.isDeleted.should.be.equal(false);
                    topic.createdAt.should.be.a('string');
                    topic.updatedAt.should.be.a('string');
                    topic.createdByUserId.should.be.a('string');
                    topic.author.should.be.a('object');
                    topic.answers.should.be.a('array');
                    
                    Object.keys(topic).should.have.length(9);
                });
            });

            it('Should be able to a admin create a topic', () => {
                return rp.post({
                    uri: `${host}/topics`,
                    json: true,
                    body: adminTopic,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }
                }).then(topic => {
                    topic.id.should.be.a('string');
                    topic.subject.should.be.equal(adminTopic.subject);
                    topic.message.should.be.equal(adminTopic.message);
                    topic.isDeleted.should.be.equal(false);
                    topic.createdAt.should.be.a('string');
                    topic.updatedAt.should.be.a('string');
                    topic.createdByUserId.should.be.a('string');
                    topic.author.should.be.a('object');
                    topic.answers.should.be.a('array');
                    
                    Object.keys(topic).should.have.length(9);
                });
            });

            it('Should receive 400 error if invalid topic', () => {
                return rp.post({
                    uri: `${host}/topics`,
                    json: true,
                    body: {},
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(400);
                });
            });

            it('Should receive 401 error if without valid token', () => {
                return rp.post({
                    uri: `${host}/topics`,
                    json: true,
                    body: studentTopic,
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(401);
                });
            });

        });

    });

    // describe('users', () => {

    //     let userId;

    //     const user = {
    //         email: `tester-${uuid.v4()}@test.com`,
    //         password: uuid.v4(),
    //         role: 'student',
    //         firstName: 'John',
    //         lastName: 'Studenty'
    //     };

    //     describe('POST /users', () => {

    //         it('Should create a new user', () => {

    //             const promise = rp.post({
    //                 uri: `${host}/users`,
    //                 json: true,
    //                 body: user
    //             });

    //             return promise.then(createdUser => {
    //                 userId = createdUser.id;
    //                 createdUser.email.should.be.equal(user.email);
    //                 createdUser.role.should.be.equal(user.role);
    //                 createdUser.firstName.should.be.equal(user.firstName);
    //                 createdUser.lastName.should.be.equal(user.lastName);
    //                 createdUser.isActive.should.be.equal(true);
    //                 createdUser.id.should.be.a('string');
    //                 createdUser.createdAt.should.be.a('string');
    //                 createdUser.updatedAt.should.be.a('string');

    //                 Object.keys(createdUser).should.have.length(8);
    //             });
    //         });
    //     });

    //     describe('GET /users/:id', () => {

    //         let token;

    //         before(() => {

    //             return rp.post({
    //                 uri: `${host}/auth/login`,
    //                 json: true,
    //                 body: {
    //                     email: user.email,
    //                     password: user.password
    //                 }
    //             }).then(response => {
    //                 token = response.token;
    //             });

    //         });

    //         it('Should receive an 401 error if without valid token', () => {
    //             const promise = rp.get({
    //                 uri: `${host}/users/${userId}`,
    //                 json: true
    //             });

    //             return promise.then(() => {
    //                 throw 'Not expectinh success';
    //             }).catch(err => {
    //                 err.statusCode.should.be.equal(401);
    //             });
    //         });

    //         it('Should get a user', () => {
    //             const promise = rp.get({
    //                 uri: `${host}/users/${userId}`,
    //                 json: true,
    //                 headers: {
    //                     Authorization: `JWT ${token}`
    //                 }
    //             });

    //             return promise.then(receivedUser => {
    //                 receivedUser.id.should.be.equal(userId);
    //                 receivedUser.email.should.be.equal(user.email);
    //                 receivedUser.role.should.be.equal(user.role);
    //                 receivedUser.firstName.should.be.equal(user.firstName);
    //                 receivedUser.lastName.should.be.equal(user.lastName);
    //                 receivedUser.isActive.should.be.equal(true);
    //                 receivedUser.id.should.be.a('string');
    //                 receivedUser.createdAt.should.be.a('string');
    //                 receivedUser.updatedAt.should.be.a('string');

    //                 Object.keys(receivedUser).should.have.length(8);
    //             });
    //         });


    //         it('Should get a 404 error if user does not exist', () => {
    //             const promise = rp.get({
    //                 uri: `${host}/users/${uuid.v4()}`,
    //                 json: true,
    //                 headers: {
    //                     Authorization: `JWT ${token}`
    //                 }
    //             });

    //             return promise.then(() => {
    //                 throw 'Should not be success';
    //             }).catch(err => {
    //                 err.statusCode.should.be.equal(404);
    //             });
    //         });
    //     });

    //     describe('DESTROY /users/:id', () => {

    //         let token;

    //         before(() => {

    //             return rp.post({
    //                 uri: `${host}/auth/login`,
    //                 json: true,
    //                 body: {
    //                     email: user.email,
    //                     password: user.password
    //                 }
    //             }).then(response => {
    //                 token = response.token;
    //             });

    //         });

    //         it('Should receive an 401 error if without valid token', () => {
    //             const promise = rp.delete({
    //                 uri: `${host}/users/${userId}`,
    //                 json: true
    //             });

    //             return promise.then(() => {
    //                 throw 'Not expectinh success';
    //             }).catch(err => {
    //                 err.statusCode.should.be.equal(401);
    //             });
    //         });


    //         it('Should delete a user', () => {
    //             const promise = rp.delete({
    //                 uri: `${host}/users/${userId}`,
    //                 json: true,
    //                 headers: {
    //                     Authorization: `JWT ${token}`
    //                 }
    //             });

    //             return promise.catch(() => {
    //                 throw 'Should not fail';
    //             });
    //         });

    //         it('Should get a 401 error if authenticated user is deleted', () => {
    //             const promise = rp.get({
    //                 uri: `${host}/users/${userId}`,
    //                 json: true,
    //                 headers: {
    //                     Authorization: `JWT ${token}`
    //                 }
    //             });

    //             return promise.then(() => {
    //                 throw 'Should not be success';
    //             }).catch(err => {
    //                 err.statusCode.should.be.equal(401);
    //             });
    // });
    // });
    // });
});

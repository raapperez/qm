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
                    studentTopicId = topic.id;
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
                    adminTopicId = topic.id;
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
                    body: studentTopic
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(401);
                });
            });

        });

        describe('LIST /topics', () => {

            it('Should be able to a student list topics', () => {
                return rp.get({
                    uri: `${host}/topics`,
                    json: true,
                    body: studentTopic,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(response => {
                    response.pagination.page.should.be.a('number');
                    response.pagination.pageSize.should.be.a('number');
                    response.pagination.total.should.be.a('number');
                    response.pagination.totalPages.should.be.a('number');
                    response.data.should.be.a('array');
                });
            });

            it('Should be able to a admin list topics', () => {
                return rp.get({
                    uri: `${host}/topics`,
                    json: true,
                    body: adminTopic,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }
                }).then(response => {
                    response.pagination.page.should.be.a('number');
                    response.pagination.pageSize.should.be.a('number');
                    response.pagination.total.should.be.a('number');
                    response.pagination.totalPages.should.be.a('number');
                    response.data.should.be.a('array');
                });
            });

            it('Should receive 401 error if wihout valid token', () => {
                return rp.get({
                    uri: `${host}/topics`,
                    json: true,
                    body: studentTopic
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(401);
                });
            });
        });

        describe('GET /topics/:id', () => {

            it('Should be able to a student get a topic', () => {
                return rp.get({
                    uri: `${host}/topics/${adminTopicId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
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

            it('Should be able to a admin get a topic', () => {
                return rp.get({
                    uri: `${host}/topics/${adminTopicId}`,
                    json: true,
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

            it('Should receive 401 error if wihout valid token', () => {
                return rp.get({
                    uri: `${host}/topics/${adminTopicId}`,
                    json: true,
                    body: studentTopic
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(401);
                });
            });
        });

    });

});

'use strict';

const env = process.env.NODE_ENV || 'development';
const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
const rp = require('request-promise');
const _ = require('lodash');
const uuid = require('uuid');

chai.use(chaiAsPromised);

const {host} = require('./helpers/constants');
const {createUserAndLogin} = require('./helpers/utils');

describe('qm forum api', () => {

    const studentUser = {
        email: 'tester-student@test.com',
        firstName: 'Tester',
        lastName: 'Student',
        password: 'h8gQHWtt',
        role: 'student',
        token: null
    };

    const studentUser2 = {
        email: 'tester-student2@test.com',
        firstName: 'Tester2',
        lastName: 'Student2',
        password: 'h8ppHWtt',
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
                createUserAndLogin(studentUser2),
                createUserAndLogin(adminUser)
            ]).then(_.spread((studentToken, studentToken2, adminToken) => {
                studentUser.token = studentToken;
                studentUser2.token = studentToken2;
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

        describe('UPDATE /topics/:id', () => {

            it('Should be able to a student update self topic', () => {
                const topicStub = {
                    subject: uuid.v4(),
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${studentTopicId}`,
                    json: true,
                    body: topicStub,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }

                }).then(topic => {
                    topic.subject.should.be.equal(topicStub.subject);
                    topic.message.should.be.equal(topicStub.message);
                });
            });

            it('Should receive error 403 if a student update other student topic', () => {
                const topicStub = {
                    subject: uuid.v4(),
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${studentTopicId}`,
                    json: true,
                    body: topicStub,
                    headers: {
                        Authorization: `JWT ${studentUser2.token}`
                    }

                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(403);
                });
            });

            it('Should receive error 403 if a student update any admin topic', () => {
                const topicStub = {
                    subject: uuid.v4(),
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${adminTopicId}`,
                    json: true,
                    body: topicStub,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }

                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(403);
                });
            });

            it('Should be able to a admin update student topic', () => {
                const topicStub = {
                    subject: uuid.v4(),
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${studentTopicId}`,
                    json: true,
                    body: topicStub,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }

                }).then(topic => {
                    topic.subject.should.be.equal(topicStub.subject);
                    topic.message.should.be.equal(topicStub.message);
                });
            });

            it('Should be able to a admin update self topic', () => {
                const topicStub = {
                    subject: uuid.v4(),
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${adminTopicId}`,
                    json: true,
                    body: topicStub,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }

                }).then(topic => {
                    topic.subject.should.be.equal(topicStub.subject);
                    topic.message.should.be.equal(topicStub.message);
                });
            });

        });

        describe('DESTROY /topics/:id', () => {

            it('Should receive error 403 if a student delete other student topic', () => {
                return rp.delete({
                    uri: `${host}/topics/${studentTopicId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${studentUser2.token}`
                    }
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(403);
                });
            });

            it('Should receive error 403 if a student delete any admin topic', () => {

                return rp.delete({
                    uri: `${host}/topics/${adminTopicId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(403);
                });
            });

            it('Should be able to a student delete self topic', () => {
                return rp.delete({
                    uri: `${host}/topics/${studentTopicId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(() => {
                }).catch(() => {
                    throw 'Should not receive error';
                });
            });

            it('Should be able to a admin delete self topic', () => {
                return rp.delete({
                    uri: `${host}/topics/${adminTopicId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }
                }).then(() => {
                }).catch(() => {
                    throw 'Should not receive error';
                });
            });

        });

    });

});

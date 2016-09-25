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

    let topicId = null;
    const topic = {
        subject: 'Main test topic subjct',
        message: 'Message of main topic'
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

        }).then(() => {
            return rp.post({
                uri: `${host}/topics`,
                json: true,
                body: topic,
                headers: {
                    Authorization: `JWT ${studentUser.token}`
                }
            }).then(topic => {
                topicId = topic.id;
            });
        });
    });

    describe('answers', () => {

        let studentAnswerId;
        const studentAnswer = {
            message: 'Student answer message'
        };

        let adminAnswerId;
        const adminAnswer = {
            message: 'Admin answer message'
        };

        describe('CREATE /topics/:topicId/answers', () => {

            it('Should be able to a student create a answer', () => {
                return rp.post({
                    uri: `${host}/topics/${topicId}/answers`,
                    json: true,
                    body: studentAnswer,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(answer => {
                    studentAnswerId = answer.id;
                    answer.id.should.be.a('string');
                    answer.message.should.be.equal(studentAnswer.message);
                    answer.topicId.should.be.equal(topicId);
                    answer.isDeleted.should.be.equal(false);
                    answer.createdAt.should.be.a('string');
                    answer.updatedAt.should.be.a('string');
                    answer.createdByUserId.should.be.a('string');
                    answer.author.should.be.a('object');

                    Object.keys(answer).should.have.length(8);
                });
            });

            it('Should be able to a admin create a answer', () => {
                return rp.post({
                    uri: `${host}/topics/${topicId}/answers`,
                    json: true,
                    body: adminAnswer,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }
                }).then(answer => {
                    adminAnswerId = answer.id;
                    answer.id.should.be.a('string');
                    answer.message.should.be.equal(adminAnswer.message);
                    answer.topicId.should.be.equal(topicId);
                    answer.isDeleted.should.be.equal(false);
                    answer.createdAt.should.be.a('string');
                    answer.updatedAt.should.be.a('string');
                    answer.createdByUserId.should.be.a('string');
                    answer.author.should.be.a('object');

                    Object.keys(answer).should.have.length(8);
                });
            });

            it('Should receive 400 error if invalid answer', () => {
                return rp.post({
                    uri: `${host}/topics/${topicId}/answers`,
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
                    uri: `${host}/topics/${topicId}/answers`,
                    json: true,
                    body: studentAnswer
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(401);
                });
            });

        });

        describe('GET /topics/:topicId/answers/:id', () => {

            it('Should be able to a student get a answer', () => {
                return rp.get({
                    uri: `${host}/topics/${topicId}/answers/${adminAnswerId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(answer => {
                    answer.id.should.be.a('string');
                    answer.message.should.be.equal(adminAnswer.message);
                    answer.topicId.should.be.equal(topicId);
                    answer.isDeleted.should.be.equal(false);
                    answer.createdAt.should.be.a('string');
                    answer.updatedAt.should.be.a('string');
                    answer.createdByUserId.should.be.a('string');
                    answer.author.should.be.a('object');

                    Object.keys(answer).should.have.length(8);
                });
            });

            it('Should be able to a admin get a answer', () => {
                return rp.get({
                    uri: `${host}/topics/${topicId}/answers/${adminAnswerId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }
                }).then(answer => {
                    answer.id.should.be.a('string');
                    answer.message.should.be.equal(adminAnswer.message);
                    answer.topicId.should.be.equal(topicId);
                    answer.isDeleted.should.be.equal(false);
                    answer.createdAt.should.be.a('string');
                    answer.updatedAt.should.be.a('string');
                    answer.createdByUserId.should.be.a('string');
                    answer.author.should.be.a('object');

                    Object.keys(answer).should.have.length(8);
                });
            });

            it('Should receive 401 error if wihout valid token', () => {
                return rp.get({
                    uri: `${host}/topics/${topicId}/answers/${adminAnswerId}`,
                    json: true,
                    body: studentAnswer
                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(401);
                });
            });
        });

        describe('UPDATE /topics/:topicId/answers/:id', () => {

            it('Should be able to a student update self answer', () => {
                const answerStub = {
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${topicId}/answers/${studentAnswerId}`,
                    json: true,
                    body: answerStub,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }

                }).then(answer => {
                    answer.message.should.be.equal(answerStub.message);
                });
            });

            it('Should receive error 403 if a student update other student answer', () => {
                const answerStub = {
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${topicId}/answers/${studentAnswerId}`,
                    json: true,
                    body: answerStub,
                    headers: {
                        Authorization: `JWT ${studentUser2.token}`
                    }

                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(403);
                });
            });

            it('Should receive error 403 if a student update any admin answer', () => {
                const answerStub = {
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${topicId}/answers/${adminAnswerId}`,
                    json: true,
                    body: answerStub,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }

                }).then(() => {
                    throw 'Should not receive success';
                }).catch(err => {
                    err.statusCode.should.be.equal(403);
                });
            });

            it('Should be able to a admin update student answer', () => {
                const answerStub = {
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${topicId}/answers/${studentAnswerId}`,
                    json: true,
                    body: answerStub,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }

                }).then(answer => {
                    answer.message.should.be.equal(answerStub.message);
                });
            });

            it('Should be able to a admin update self answer', () => {
                const answerStub = {
                    message: uuid.v4()
                };
                return rp.put({
                    uri: `${host}/topics/${topicId}/answers/${adminAnswerId}`,
                    json: true,
                    body: answerStub,
                    headers: {
                        Authorization: `JWT ${adminUser.token}`
                    }

                }).then(answer => {
                    answer.message.should.be.equal(answerStub.message);
                });
            });
        });

        describe('DESTROY /topics/:topicId/answers/:id', () => {

            it('Should receive error 403 if a student delete other student answer', () => {
                return rp.delete({
                    uri: `${host}/topics/${topicId}/answers/${studentAnswerId}`,
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

            it('Should receive error 403 if a student delete any admin answer', () => {

                return rp.delete({
                    uri: `${host}/topics/${topicId}/answers/${adminAnswerId}`,
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

            it('Should be able to a student delete self answer', () => {
                return rp.delete({
                    uri: `${host}/topics/${topicId}/answers/${studentAnswerId}`,
                    json: true,
                    headers: {
                        Authorization: `JWT ${studentUser.token}`
                    }
                }).then(() => {
                }).catch(() => {
                    throw 'Should not receive error';
                });
            });

            it('Should be able to a admin delete self answer', () => {
                return rp.delete({
                    uri: `${host}/topics/${topicId}/answers/${adminAnswerId}`,
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

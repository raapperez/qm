'use strict';


module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define('Answer', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Answer.belongsTo(models.User, {                        
                        foreignKey: 'createdByUserId'
                    });

                    Answer.belongsTo(models.Topic, {                        
                        foreignKey: 'topicId'
                    });

                    Answer.belongsTo(models.Answer, {
                        foreignKey: 'answerId'
                    });

                    Answer.hasMany(models.Answer, {
                        as: 'Answers',
                        foreignKey: 'answerId'
                    });
                }
            },
            instanceMethods: {}
        }
    );

    return Answer;
};
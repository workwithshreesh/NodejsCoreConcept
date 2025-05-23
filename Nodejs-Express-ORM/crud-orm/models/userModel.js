const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncreement: true,
            primaryKey: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        works: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true
        },
        maried_status: {
            type: DataTypes.ENUM('single', 'married', 'divorced', 'widowed'),
            allowNull: false,
            defaultValue: 'single'
        }
    },
    {
        paranoid: true,
        timestamps: true
    }
);
}
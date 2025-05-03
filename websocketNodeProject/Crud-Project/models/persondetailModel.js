const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Person', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        lname:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        }
},
{
    paranoid: true,
    timestamps: true
}

);
}
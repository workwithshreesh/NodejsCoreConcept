const sequelize = require('../config/connectionDb');
const Person = require('./persondetailModel')(sequelize);


module.exports = {
    sequelize,
    Person
}
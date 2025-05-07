const Person = require('../../models');



exports.create = (data) => Person.create(data);
exports.findAll = () => Person.findAll();
exports.findById = (id) => Person.findByPk(id);
exports.update = (id, data) => Person.update(data, { where:{ id } });
exports.delete = (id) => Person.destroy({ where: { id } });
const { Person } = require('../services/person.service');
const { success, error } = require("../../utils/response");
// const

exports.createPerson = async (ws,data) => {
    try {
        const person = await Person.create(data);
        ws.send(JSON.stringify(success(person, 'create')));
    } catch (err) {
        console.log('error in create person',err.message);
        ws.send(JSON.stringify(error(error.message)))
    }
}



exports.readPerson = async (ws) => {
    try {
        const person = await Person.find();
        ws.send(JSON.stringify(success(person, 'read')));
    } catch (error) {
        console.log('error in read person',err.message);
        ws.send(JSON.stringify(error(error.message)));
    }
}



exports.updatePerson = async (ws, data) => {
    try {
        const person = await Person.findByPk(data.id);
        if(!person) throw new Error('No record found');

        await Person.update(data);
        ws.send(JSON.stringify({action: 'update', success:true}));

    } catch (error) {
        ws.send(stringify(JSON.parse({action: 'update', success: false, error: err.message})))
    }
}



exports.deletePerson = async (ws, data) => {
    try {
        const person = await Person.findByPk(data.id);
        if (!person) throw new Error('No record found');

        await person.destroy();
        ws.send(JSON.stringify({ action: 'delete', success: true  }))
    } catch (error) {
        ws.send(JSON.stringify({ action: 'delete', success: false, error: err.message }))
    }

}
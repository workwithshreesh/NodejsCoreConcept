const { Person } = require('../models');


exports.createPerson = async (ws,data) => {
    try {
        const person = await Person.create(data);
        return res.status(200).json(person);
    } catch (err) {
        console.log('error in create person',err.message);
        res.status(400).json({'error':err.message});
    }
}



exports.readPerson = async (ws) => {
    try {
        const person = await Person.find();
        ws.send(JSON.stringify({ action: 'read', success: true, person }));
    } catch (error) {
        console.log('error in read person',err.message);
        ws.send(JSON.stringify({action: 'read', success: false, error: error.message}))
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
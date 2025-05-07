const personController = require('../controller/persondetailController');
const { createError } = require('../../utils/errorHelper');
const { personSchema } = require('../../validation/person.schema');

module.exports = (ws, wss) => {
    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            const { action, payload } = data;

            switch (action) {
                case 'create': {
                    const { error } = personSchema.validate(payload);
                    if (error) {
                        return ws.send(JSON.stringify(createError(error.message, 400)));
                    }
                    await personController.createPerson(ws, payload);
                    break;
                }

                case 'read': {
                    await personController.readPerson(ws);
                    break;
                }

                case 'update': {
                    const { error } = personSchema.validate(payload);
                    if (error) {
                        return ws.send(JSON.stringify(createError(error.message, 400)));
                    }
                    await personController.updatePerson(ws, payload);
                    break;
                }

                case 'delete': {
                    if (!payload?.id) {
                        return ws.send(JSON.stringify(createError("ID is required for deletion", 400)));
                    }
                    await personController.deletePerson(ws, payload);
                    break;
                }

                default:
                    ws.send(JSON.stringify(createError("Invalid action", 400)));
            }
        } catch (err) {
            ws.send(JSON.stringify(createError("Malformed message or internal error", 500)));
        }
    });
};

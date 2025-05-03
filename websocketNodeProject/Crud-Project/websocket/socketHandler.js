const personController = require('../controller/persondetailController');

module.exports = (ws, wss) => {
    ws.on('message', async (message) => {
        const data = JSON.parse(message);
        const {action, payload} = data;

        switch (data.action){
            case 'create':
                await personController.createPerson(ws, payload);
                break;
            
            case 'read':
                await personController.readPerson(ws);
                break;
            
            case 'update':
                await personController.updatePerson(ws, payload);
                break;

            case 'delete':
                await personController.deletePerson(ws, payload);
                break;

            default:
                ws.send(JSON.stringify({ success: false, error: 'Invalid action type' }));
        }
    });
}
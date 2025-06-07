const app = require("express");
const controller = require('./mailer')
const router = app.Router();

router.post('/send-email',controller.sendSingleEmail);
router.post('/send-bulk-email', controller.sendBulkEmail);

module.exports = router;

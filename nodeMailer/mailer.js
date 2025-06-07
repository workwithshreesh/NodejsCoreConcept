const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});



async function sendSingleEmail(){
    try {

        const {recipient, subject, htmlContent} = req.body;
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient,
            subject,
            html: htmlContent
        });
        console.log(`sent to ${recipient}:`,info.messageId);
        return info;
    } catch (err){
        console.error(`Failed to send to ${recipient}:`,err.message);
    }
}



async function sendBulkEmail(){
    try {

        const {recipients, subject, htmlContent} = req.body;

        if(!recipients || !Array.isArray(recipients)){
            return resizeBy.status(400).json({error: 'Recipient must be an array of emails'});
        }

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipients.join(','),
            subject,
            html: htmlContent
        });

        console.log(`Email sent:`,info.messageId);
        return info;

    } catch (error){
        console.error(error);
    }
}

module.exports = {
    sendBulkEmail,
    sendSingleEmail
}
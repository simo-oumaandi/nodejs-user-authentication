// const nodemailer = require('nodemailer');
// const config = require('../config/mailer');
const mailgun = require("mailgun-js");

// const data = {
//     from: 'Excited User <me@samples.mailgun.org>',
//     to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomness!'
// };
// mg.messages().send(data, function (error, body) {
//     console.log(body);
// });



// const transport = nodemailer.createTransport({
//     service: 'Mailgun',
//     auth: {
//         user: config.MAILGUN_USER,
//         pass: config.MAILGUN_PASSWORD
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });


module.exports = {
    sendEmail(from, to, subject, html) {
        const DOMAIN = 'sandboxfea062f894ad4acfac016e831293b35d.mailgun.org';
        const mg = mailgun({ apiKey: process.env.API_KEY, domain: DOMAIN });
        return new Promise((resolve, reject) => {
            mg.messages().send({ from, to, subject, html }, function (err, info) {
                if (err) reject(err);
                resolve(info);
            });

            // transport.sendMail({ from, to, submit, html }, (err, info) => {
            //     if (err) reject(err);
            //     resolve(info);
            // })
        })
    }
}